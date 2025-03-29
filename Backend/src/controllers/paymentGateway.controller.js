import Razorpay from 'razorpay';
import crypto from 'crypto';
import Donation from '../models/donation.model.js';
import NGO from '../models/ngo.model.js';
import Transaction from '../models/transaction.model.js';

// Initialize Razorpay with your key_id and key_secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async (req, res) => {
  try {
    const { amount, donorName, email, phone, purpose } = req.body;

    // Amount is already in paise from frontend
    const options = {
      amount: amount, // Don't multiply by 100 here since it's already in paise
      currency: 'INR',
      receipt: `donation_${Date.now()}`,
      payment_capture: 1, // Auto capture the payment
      notes: {
        donorName,
        email,
        phone,
        purpose
      }
    };

    const order = await razorpay.orders.create(options);

    // Create donation record
    await Donation.create({
      donorName,
      email,
      phone,
      amount: amount / 100, // Store the amount in rupees in database
      purpose,
      orderId: order.id,
      status: 'pending',
      isAllocated: false
    });

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error creating donation order:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing donation request'
    });
  }
};

// Admin endpoints for fund management
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 });

    const stats = {
      totalDonations: donations.reduce((sum, d) => sum + (d.status === 'completed' ? d.amount : 0), 0),
      pendingAllocation: donations.reduce((sum, d) => sum + (d.status === 'completed' && !d.isAllocated ? d.amount : 0), 0),
      allocatedAmount: donations.reduce((sum, d) => sum + (d.isAllocated ? d.amount : 0), 0)
    };

    res.status(200).json({
      success: true,
      donations,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching donations'
    });
  }
};

export const allocateFunds = async (req, res) => {
  try {
    const { ngoId, amount, donationIds } = req.body;

    // Verify NGO exists
    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    // Create transaction record
    const transaction = await Transaction.create({
      ngoId,
      amount,
      donationIds,
      status: 'completed',
      allocatedBy: req.user._id,
      allocatedAt: new Date()
    });

    // Update donations as allocated
    await Donation.updateMany(
      { _id: { $in: donationIds } },
      { 
        isAllocated: true,
        allocatedTo: ngoId,
        allocatedAt: new Date()
      }
    );

    // Update NGO's total received funds
    await NGO.findByIdAndUpdate(
      ngoId,
      { $inc: { totalFundsReceived: amount } }
    );

    res.status(200).json({
      success: true,
      message: 'Funds allocated successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error allocating funds'
    });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('ngoId', 'organizationName')
      .populate('allocatedBy', 'name')
      .sort({ allocatedAt: -1 });

    res.status(200).json({
      success: true,
      transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transaction history'
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    // Create signature verification
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    // Verify signature
    if (razorpay_signature === expectedSign) {
      // Update donation status
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { 
          status: 'completed',
          paymentId: razorpay_payment_id,
          completedAt: new Date()
        }
      );

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      await Donation.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: 'failed' }
      );

      res.status(400).json({
        success: false,
        message: 'Invalid signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment'
    });
  }
};
