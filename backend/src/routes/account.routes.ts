import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, data: { accounts: [
    { id: '1', type: 'SAVINGS', number: 'NEOB00000014589', balance: 185420, bank: 'NeoBank Cloud', ifsc: 'NEOB0000001', status: 'ACTIVE' },
    { id: '2', type: 'CURRENT', number: 'NEOB00000017823', balance: 60260, bank: 'NeoBank Cloud Business', ifsc: 'NEOB0000001', status: 'ACTIVE' },
  ], totalBalance: 245680 }});
});

router.get('/summary', authenticate, (req, res) => {
  res.json({ success: true, data: { totalBalance: 245680, savings: 185420, current: 60260, fixedDeposit: 200000, monthlyIncome: 85000, monthlyExpense: 42500 }});
});

router.get('/savings', authenticate, (req, res) => {
  res.json({ success: true, data: [{ id: '1', type: 'SAVINGS', number: 'NEOB00000014589', balance: 185420, interestRate: 4.0, bank: 'NeoBank Cloud' }]});
});

router.get('/current', authenticate, (req, res) => {
  res.json({ success: true, data: [{ id: '2', type: 'CURRENT', number: 'NEOB00000017823', balance: 60260, bank: 'NeoBank Cloud Business' }]});
});

router.get('/:id', authenticate, (req, res) => {
  res.json({ success: true, data: { id: req.params.id, type: 'SAVINGS', number: 'NEOB00000014589', balance: 185420, bank: 'NeoBank Cloud', ifsc: 'NEOB0000001', status: 'ACTIVE', interestRate: 4.0 }});
});

router.get('/:id/balance', authenticate, (req, res) => {
  res.json({ success: true, data: { balance: 185420, availableBalance: 185420 }});
});

router.get('/beneficiaries', authenticate, (req, res) => {
  res.json({ success: true, data: [
    { id: '1', name: 'Rahul Sharma', accountNumber: '••••5678', ifscCode: 'HDFC0001234', bankName: 'HDFC Bank' },
    { id: '2', name: 'Priya Patel', accountNumber: '••••9012', ifscCode: 'ICIC0005678', bankName: 'ICICI Bank' },
    { id: '3', name: 'Amit Kumar', accountNumber: '••••3456', ifscCode: 'SBIN0009012', bankName: 'SBI' },
  ]});
});

router.post('/beneficiaries', authenticate, (req, res) => {
  res.json({ success: true, message: 'Beneficiary added', data: { id: '4', ...req.body }});
});

export default router;
