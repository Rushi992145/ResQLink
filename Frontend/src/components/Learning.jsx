import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, Award, X, Youtube, Loader, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_API_KEY_GROQ,
  dangerouslyAllowBrowser: true
});

// --- MASTER VIDEO LIST ---
const MASTER_VIDEO_LIST = [
  // DISASTER MANAGEMENT
  { id: "pXkOscAY8zk", title: "Disaster Management 101", cat: "Disaster" },
  { id: "RwtEp84tGYQ", title: "Disaster Risk Reduction", cat: "Disaster" },
  { id: "leoVtgkLYR4", title: "4 Phases of Emergency Mgmt", cat: "Disaster" },
  { id: "w78JrJrio-U", title: "Incident Command System", cat: "Disaster" },
  { id: "y16aMLeh91Q", title: "Disaster Response Basics", cat: "Disaster" },
  { id: "9WIwlljva_s", title: "Emergency Preparedness", cat: "Disaster" },
  { id: "R7A086ZQhO8", title: "Search and Rescue Basics", cat: "Disaster" },
  { id: "KwAKjtkpdP4", title: "Flood Safety Guide", cat: "Disaster" },
  { id: "1zB7tMH9k_s", title: "Earthquake Safety Tips", cat: "Disaster" },
  { id: "BaWnRznp1AU", title: "Tsunami Awareness", cat: "Disaster" },
  { id: "fiqTjEqs604", title: "Wildfire Safety", cat: "Disaster" },
  { id: "_F9q81FbKsA", title: "Cyclone/Hurricane Safety", cat: "Disaster" },
  { id: "8wamY0Xi2SM", title: "Landslide Safety", cat: "Disaster" },
  { id: "FVwvbS-0q18", title: "First Aid during Disasters", cat: "Disaster" },
  { id: "2oOSeLJsh2U", title: "Community Based Disaster Mgmt", cat: "Disaster" },
  { id: "USLHmwvpjX8", title: "Youth in Disaster Management", cat: "Disaster" },

  // SAFETY
  { id: "L0Yy46xLUCw", title: "Fire Extinguisher (PASS)", cat: "Safety" },
  { id: "wc_YwajwWPg", title: "Workplace Safety Basics", cat: "Safety" },
  { id: "McQD8TbpX_Y", title: "PPE Usage Guide", cat: "Safety" },
  { id: "tAGdnlo3OXE", title: "Electrical Safety", cat: "Safety" },
  { id: "At2jHpw5buk", title: "Chemical Safety", cat: "Safety" },
  { id: "d7pZo_kiKwg", title: "Road Safety Rules", cat: "Safety" },
  { id: "83ypKDyoZFo", title: "Ladder & Height Safety", cat: "Safety" },
  { id: "GVBamXXVD30", title: "Safe Lifting Techniques", cat: "Safety" },

  // HEALTH
  { id: "clD-uFZROI4", title: "CPR Training", cat: "Health" },
  { id: "dCOojwkWO8c", title: "Basic First Aid", cat: "Health" },
  { id: "v2FNbuPR01Y", title: "Choking Rescue", cat: "Health" },
  { id: "qsJtFCwcCjM", title: "Bleeding Control", cat: "Health" },
  { id: "8PBL0FOFjqo", title: "Fracture Management", cat: "Health" }
];

// --- 1. SELECT VIDEOS ---
const selectRandomVideos = (volunteerData) => {
  const text = (volunteerData.skills + " " + volunteerData.achievements).toLowerCase();
  let pref = "";
  if (text.includes("medic") || text.includes("health")) pref = "Health";
  else if (text.includes("fire") || text.includes("safe")) pref = "Safety";
  else if (text.includes("disaster") || text.includes("rescue")) pref = "Disaster";

  const shuffled = [...MASTER_VIDEO_LIST].sort(() => 0.5 - Math.random());
  const preferredVideos = pref ? shuffled.filter(v => v.cat === pref) : [];
  const otherVideos = shuffled.filter(v => v.cat !== pref);

  // Get 6 videos
  const selection = [...preferredVideos.slice(0, 3), ...otherVideos].slice(0, 6);

  return selection.map(v => ({
    ...v,
    videoId: v.id,
    thumbnail: `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`,
    description: "Fetching AI analysis...", 
    channel: "Training"
  }));
};

// --- 2. AI GENERATION ---
const getAiSummaries = async (videos) => {
  try {
    const prompt = `
    I have 6 videos:
    ${videos.map(v => `ID: "${v.id}" Title: "${v.title}"`).join("\n")}

    TASK: Provide 3 short takeaways for each video.
    
    CRITICAL INSTRUCTION: 
    Return Valid JSON. Keys are Video IDs. Values must be ARRAYS of strings.
    Do NOT include markdown.

    Example:
    {
      "pXkOscAY8zk": ["Point 1", "Point 2", "Point 3"],
      "RwtEp84tGYQ": ["Point A", "Point B", "Point C"]
    }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a strict JSON generator. Output only raw JSON." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
    });

    let content = chatCompletion.choices[0]?.message?.content || "{}";
    
    // Clean response
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();
    content = content.replace(/[\u0000-\u001F]+/g, "");

    const parsed = JSON.parse(content);
    return parsed; 

  } catch (error) {
    console.error("AI Parsing Error:", error);
    return {}; 
  }
};

const Learning = () => {
  const id = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const hasFetched = useRef(false);

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [volunteerData, setVolunteerData] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      setLoading(true);

      try {
        const res = await axios.post(
          "http://localhost:3000/api/volunteers/getvoldetails",
          { userId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data?.data ?? res.data;
        setVolunteerData(data);

        // 1. Pick Videos
        const selection = selectRandomVideos(data);
        setVideos(selection);
        setLoading(false);

        // 2. Fetch AI
        const summaries = await getAiSummaries(selection);
        
        // 3. Update State
        setVideos(prev => prev.map(vid => {
            const summaryArray = summaries[vid.id];
            const finalDesc = Array.isArray(summaryArray) 
              ? summaryArray.map(s => `• ${s}`).join("\n") 
              : "• Introduction to the topic\n• Key safety protocols\n• Best practices for volunteers";
            
            return { ...vid, description: finalDesc };
        }));

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (id && token) init();
  }, [id, token]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader className="animate-spin text-purple-600 w-12 h-12"/></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50/30">
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Training Hub</h2>
        {volunteerData && <p className="text-gray-500 mt-1">Curated for: {volunteerData.skills}</p>}
      </div>

      {/* Video Grid - FIXED LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, idx) => (
          <motion.div
            key={video.id + idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedVideo(video)}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-900 shrink-0">
              <img 
                src={video.thumbnail} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                alt={video.title}
                onError={(e) => e.target.src = "https://via.placeholder.com/640x360?text=Training+Video"}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                   <Play className="w-8 h-8 text-white" fill="currentColor"/>
                </div>
              </div>
              <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide border border-white/10">
                {video.cat}
              </span>
            </div>
            
            {/* Content - With Flex Grow to fix overlap */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-2 group-hover:text-purple-600 transition-colors">
                {video.title}
              </h3>
              {/* LINE CLAMP FIX: Prevents description from overflowing card */}
              <div className="text-sm text-gray-500 line-clamp-4 whitespace-pre-line leading-relaxed flex-grow">
                {video.description.includes("Fetching") ? (
                  <span className="flex items-center gap-2 text-purple-500"><Loader className="w-3 h-3 animate-spin"/> AI generating summary...</span>
                ) : video.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- TRANSPARENT GLASS MODAL --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-3xl w-full max-w-7xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[85vh] border border-white/20"
            >
              {/* Player Section */}
              <div className="w-full lg:flex-1 bg-black flex items-center justify-center relative group">
                 <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  className="w-full h-full aspect-video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Sidebar Section */}
              <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col border-l border-gray-100 bg-white/80 shrink-0">
                
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-white/50">
                   <div>
                     <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded uppercase tracking-wider">
                        {selectedVideo.cat}
                     </span>
                     <h2 className="text-xl font-bold text-gray-900 mt-2 leading-tight">{selectedVideo.title}</h2>
                   </div>
                   <button onClick={() => setSelectedVideo(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                     <X className="w-5 h-5 text-gray-500"/>
                   </button>
                </div>

                <div className="p-6 overflow-y-auto flex-grow space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-500"/> Important Takeaways
                    </h4>
                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {selectedVideo.description}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-white/50 mt-auto">
                  <a 
                    href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4"/> Open in YouTube
                  </a>
                  <div className="text-center mt-2">
                    {selectedVideo.description.includes("Unavailable") && (
                        <span className="text-[10px] text-red-400 flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3"/> AI Summary failed. Default text shown.</span>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Learning;