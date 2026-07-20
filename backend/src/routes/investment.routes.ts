import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, data: [
    { id: '1', type: 'MUTUAL_FUND', name: 'HDFC Mid-Cap Opportunities Fund', units: 150.25, navPerUnit: 85.50, investedAmount: 100000, currentValue: 128463, returns: 28463, returnsPercent: 28.46, status: 'ACTIVE' },
    { id: '2', type: 'STOCK', name: 'Reliance Industries', units: 25, navPerUnit: 2850, investedAmount: 50000, currentValue: 71250, returns: 21250, returnsPercent: 42.5, status: 'ACTIVE' },
    { id: '3', type: 'GOLD', name: 'Digital Gold', units: 10, navPerUnit: 6500, investedAmount: 55000, currentValue: 65000, returns: 10000, returnsPercent: 18.18, status: 'ACTIVE' },
    { id: '4', type: 'FIXED_DEPOSIT', name: '12 Month FD', units: 1, navPerUnit: 200000, investedAmount: 200000, currentValue: 208000, returns: 8000, returnsPercent: 4.0, status: 'ACTIVE' },
  ]});
});

router.get('/fd', authenticate, (req, res) => {
  res.json({ success: true, data: [
    { id: '4', type: 'FIXED_DEPOSIT', name: '12 Month FD', amount: 200000, interestRate: 7.0, tenure: 12, maturityAmount: 214489, startDate: '2026-01-15', endDate: '2027-01-15', status: 'ACTIVE' },
    { id: '5', type: 'FIXED_DEPOSIT', name: '24 Month FD', amount: 300000, interestRate: 7.5, tenure: 24, maturityAmount: 349000, startDate: '2025-06-01', endDate: '2027-06-01', status: 'ACTIVE' },
  ]});
});

router.post('/fd', authenticate, (req, res) => {
  res.json({ success: true, message: 'FD created successfully', data: { id: '6', ...req.body }});
});

export default router;
