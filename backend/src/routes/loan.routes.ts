import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, data: [
    { id: '1', type: 'PERSONAL', amount: 500000, interestRate: 10.5, tenure: 36, emi: 16134, outstanding: 320000, paidAmount: 180000, startDate: '2024-01-15', endDate: '2027-01-15', status: 'ACTIVE' },
    { id: '2', type: 'HOME', amount: 2500000, interestRate: 8.5, tenure: 240, emi: 21849, outstanding: 2200000, paidAmount: 300000, startDate: '2023-06-01', endDate: '2043-06-01', status: 'ACTIVE' },
  ]});
});

router.get('/:id', authenticate, (req, res) => {
  res.json({ success: true, data: { id: req.params.id, type: 'PERSONAL', amount: 500000, interestRate: 10.5, tenure: 36, emi: 16134, outstanding: 320000 }});
});

router.get('/emi-calculator', authenticate, (req, res) => {
  const { amount, rate, tenure } = req.query;
  const r = Number(rate) / 12 / 100;
  const n = Number(tenure);
  const emi = Number(amount) * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  res.json({ success: true, data: { emi: Math.round(emi), totalPayment: Math.round(emi * n), totalInterest: Math.round(emi * n - Number(amount)) }});
});

export default router;
