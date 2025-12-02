import Groq from "groq-sdk";
import { asyncHandler } from "../utils/asyncHandler.js";
import Donation from "../models/donation.model.js";

const groq = new Groq({
  apiKey: process.env.VITE_API_KEY_GROQ,
  timeout: 30000,
});

export const allocateResources = asyncHandler(async (req, res) => {
  const { aids = [], availableResources = {} } = req.body || {};

  // If frontend didn't supply availableResources, compute from unallocated donations
  let computedAvailable = { ...(availableResources || {}) };
  if (!computedAvailable || Object.keys(computedAvailable).length === 0) {
    try {
      const donations = await Donation.find({ status: 'completed', isAllocated: false });
      const totalFunds = donations.reduce((s, d) => s + (d.amount || 0), 0);

      const pricePerUnit = {
        "Food": 50,
        "Water": 10,
        "Medical Supplies": 200,
        "Shelter Kits": 1000,
        "Sanitation Kits": 150,
        "Rescue Equipment": 2000,
        "Blankets": 300
      };

      const requestedValue = {};
      for (const aid of aids) {
        for (const req of aid.requirements || []) {
          const unitPrice = pricePerUnit[req.type] || 100;
          requestedValue[req.type] = (requestedValue[req.type] || 0) + ((req.quantity || 0) * unitPrice);
        }
      }

      const totalRequestedValue = Object.values(requestedValue).reduce((s, v) => s + v, 0);
      if (totalFunds > 0 && totalRequestedValue > 0) {
        for (const resource of Object.keys(requestedValue)) {
          const portion = requestedValue[resource] / totalRequestedValue;
          const fundsForResource = Math.floor(totalFunds * portion);
          const unit = pricePerUnit[resource] || 100;
          const count = Math.floor(fundsForResource / unit);
          if (count > 0) computedAvailable[resource] = (computedAvailable[resource] || 0) + count;
        }
      }
    } catch (err) {
      console.error("Error computing availableResources from donations:", err?.message || err);
    }
  }

  const usedAvailableResources = computedAvailable;

  if (!Array.isArray(aids) || aids.length === 0) {
    return res.status(400).json({ success: false, message: "No aids provided" });
  }

  const prompt = `You are an allocation assistant. Given a list of aid requests and the available resource inventory, allocate resources across requests. Return ONLY valid JSON mapping each aid _id to allocated counts per requested resource.\n\nAidRequests: ${JSON.stringify(aids)}\n\nAvailableResources: ${JSON.stringify(usedAvailableResources)}\n\nOutput format:\n{\n  "allocations": [\n    {"aidId": "<aid._id>", "allocated": [{"type": "Medical Supplies", "requested": 10, "allocated": 5}, ...]}\n  ]\n}\n\nRules:\n- Do not allocate more than available.\n- Try to satisfy higher-urgency requests first if an "urgencyScore" is present on aid objects. If absent, distribute proportionally by requested quantities.\n- Keep totals consistent (sum of allocated per resource <= availableResources[resource]).\nReturn ONLY JSON.`;

  let groqResult = null;
  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      max_tokens: 600,
      temperature: 0.2,
    });

    const raw = response.choices?.[0]?.message?.content;
    const cleaned = raw?.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    groqResult = JSON.parse(cleaned);
  } catch (err) {
    console.error("Groq allocation error:", err?.message || err);
    groqResult = null;
  }

  if (!groqResult || !groqResult.allocations) {
    const allocations = [];
    const avail = { ...usedAvailableResources };
    const resourceTotals = {};
    for (const aid of aids) {
      for (const req of aid.requirements || []) {
        resourceTotals[req.type] = (resourceTotals[req.type] || 0) + (req.quantity || 0);
      }
    }

    // If urgencyScore present, sort aids by urgency descending
    const aidsSorted = [...aids].sort((a, b) => (b.urgencyScore || 0) - (a.urgencyScore || 0));

    for (const aid of aidsSorted) {
      const allocated = [];
      for (const req of aid.requirements || []) {
        const totalReq = resourceTotals[req.type] || 0;
        const availQty = avail[req.type] || 0;
        let alloc = 0;
        if (availQty <= 0) alloc = 0;
        else if (totalReq <= 0) alloc = 0;
        else alloc = Math.floor(((req.quantity || 0) / totalReq) * (availableResources[req.type] || availQty));
        alloc = Math.min(alloc, avail[req.type] || 0);
        avail[req.type] = (avail[req.type] || 0) - alloc;
        allocated.push({ type: req.type, requested: req.quantity || 0, allocated: alloc });
      }
      allocations.push({ aidId: aid._id, allocated });
    }

    return res.status(200).json({ success: true, allocations });
  }

  return res.status(200).json({ success: true, allocations: groqResult.allocations });
});

export default { allocateResources };
