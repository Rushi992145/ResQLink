import express from 'express';
import { 
  createOrder, 
  verifyPayment, 
  getAllDonations,
  allocateFunds,
  getTransactionHistory
} from '../controllers/paymentGateway.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public donation endpoint
router.post('/donate', createOrder);
router.post('/verify-donation',  verifyPayment);

// Admin only endpoints
router.get('/admin/donations',  getAllDonations);
router.post('/admin/allocate',  allocateFunds);
router.get('/admin/transactions', getTransactionHistory);

export default router;
