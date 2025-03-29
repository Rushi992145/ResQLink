import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  donationIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }],
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  allocatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  allocatedAt: {
    type: Date,
    required: true
  },
  notes: String
});

export default mongoose.model('Transaction', transactionSchema);
