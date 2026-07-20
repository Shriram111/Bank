import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

const mockTransactions = [
  { id: '1', title: 'Amazon Shopping', category: 'Shopping', amount: -2499, date: '2026-07-15', time: '14:30', status: 'completed', type: 'DEBIT', reference: 'TXN1721056200001', icon: '🛍️' },
  { id: '2', title: 'Salary Credit - TCS', category: 'Income', amount: 85000, date: '2026-07-14', time: '09:00', status: 'completed', type: 'CREDIT', reference: 'TXN1720970400002', icon: '💰' },
  { id: '3', title: 'Netflix Subscription', category: 'Entertainment', amount: -649, date: '2026-07-13', time: '00:00', status: 'completed', type: 'DEBIT', reference: 'TXN1720884000003', icon: '🎬' },
  { id: '4', title: 'UPI to Rahul Sharma', category: 'Transfer', amount: -5000, date: '2026-07-12', time: '18:45', status: 'completed', type: 'TRANSFER', reference: 'TXN1720797900004', icon: '💸' },
  { id: '5', title: 'Electricity Bill - BSES', category: 'Utilities', amount: -1850, date: '2026-07-11', time: '10:20', status: 'completed', type: 'BILL_PAYMENT', reference: 'TXN1720711200005', icon: '⚡' },
  { id: '6', title: 'Swiggy Order', category: 'Food', amount: -456, date: '2026-07-10', time: '20:15', status: 'completed', type: 'DEBIT', reference: 'TXN1720624500006', icon: '🍔' },
  { id: '7', title: 'Refund - Myntra', category: 'Refund', amount: 1299, date: '2026-07-09', time: '15:00', status: 'completed', type: 'CREDIT', reference: 'TXN1720538000007', icon: '↩️' },
  { id: '8', title: 'ATM Withdrawal', category: 'Cash', amount: -10000, date: '2026-07-08', time: '11:30', status: 'completed', type: 'DEBIT', reference: 'TXN1720451800008', icon: '🏧' },
];

router.get('/', authenticate, (req, res) => {
  const { type, page = 1, limit = 20 } = req.query;
  let filtered = mockTransactions;
  if (type && type !== 'all') filtered = mockTransactions.filter(t => type === 'credit' ? t.amount > 0 : t.amount < 0);
  res.json({ success: true, data: { transactions: filtered, pagination: { page: Number(page), limit: Number(limit), total: filtered.length, hasMore: false } }});
});

router.get('/recent', authenticate, (req, res) => {
  res.json({ success: true, data: mockTransactions.slice(0, 5) });
});

router.get('/stats', authenticate, (req, res) => {
  res.json({ success: true, data: { totalCredit: 101299, totalDebit: 20454, transactionCount: 8, averageTransaction: 15218 }});
});

router.get('/:id', authenticate, (req, res) => {
  const txn = mockTransactions.find(t => t.id === req.params.id);
  if (!txn) return res.status(404).json({ success: false, message: 'Transaction not found' });
  res.json({ success: true, data: txn });
});

router.post('/transfer', authenticate, (req, res) => {
  const { to, amount, note, method } = req.body;
  const newTxn = { id: String(Date.now()), title: `Transfer to ${to}`, category: 'Transfer', amount: -Number(amount), date: new Date().toISOString().split('T')[0], time: new Date().toTimeString().slice(0,5), status: 'completed', type: 'TRANSFER', reference: `TXN${Date.now()}`, icon: '💸' };
  res.json({ success: true, message: 'Transfer successful', data: newTxn });
});

router.post('/upi', authenticate, (req, res) => {
  res.json({ success: true, message: 'UPI payment successful', data: { reference: `UPI${Date.now()}`, ...req.body } });
});

router.post('/bill-payment', authenticate, (req, res) => {
  res.json({ success: true, message: 'Bill payment successful', data: { reference: `BILL${Date.now()}`, ...req.body } });
});

router.post('/recharge', authenticate, (req, res) => {
  res.json({ success: true, message: 'Recharge successful', data: { reference: `RECH${Date.now()}`, ...req.body } });
});

export default router;
