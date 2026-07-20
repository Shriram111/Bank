import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, data: { totalPoints: 12500, tier: 'Gold', nextTier: 'Platinum', pointsToNext: 7500, transactions: [
    { id: '1', description: 'UPI Payment - Swiggy', points: 50, type: 'EARNED', date: '2026-07-15' },
    { id: '2', description: 'Redeemed for Amazon Voucher', points: -5000, type: 'REDEEMED', date: '2026-07-10' },
    { id: '3', description: 'Credit Card Payment', points: 200, type: 'EARNED', date: '2026-07-08' },
  ]}});
});

router.get('/redeem', authenticate, (req, res) => {
  res.json({ success: true, data: [
    { id: '1', name: 'Amazon Voucher ₹500', points: 5000, category: 'Shopping' },
    { id: '2', name: 'Flipkart Voucher ₹1000', points: 9500, category: 'Shopping' },
    { id: '3', name: 'Movie Tickets', points: 3000, category: 'Entertainment' },
    { id: '4', name: 'Fuel Voucher ₹200', points: 2000, category: 'Travel' },
  ]});
});

router.post('/redeem/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Reward redeemed successfully' });
});

export default router;
