import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

router.get('/methods', authenticate, (req, res) => {
  res.json({ success: true, data: ['UPI', 'Net Banking', 'Debit Card', 'Credit Card', 'NEFT', 'RTGS', 'IMPS'] });
});

router.post('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Payment initiated', data: { id: `PAY${Date.now()}`, status: 'pending', ...req.body }});
});

router.get('/billers', authenticate, (req, res) => {
  res.json({ success: true, data: [
    { id: '1', name: 'BSES Delhi', category: 'Electricity', logo: '⚡' },
    { id: '2', name: 'Adani Electricity', category: 'Electricity', logo: '⚡' },
    { id: '3', name: 'Jio Fiber', category: 'Internet', logo: '📶' },
    { id: '4', name: 'Airtel DTH', category: 'DTH', logo: '📺' },
  ]});
});

router.get('/recharge/providers', authenticate, (req, res) => {
  res.json({ success: true, data: ['Jio', 'Airtel', 'Vi', 'BSNL'] });
});

router.post('/bill', authenticate, (req, res) => {
  res.json({ success: true, message: 'Bill payment successful', data: { reference: `BILL${Date.now()}` }});
});

router.post('/recharge', authenticate, (req, res) => {
  res.json({ success: true, message: 'Recharge successful', data: { reference: `RECH${Date.now()}` }});
});

export default router;
