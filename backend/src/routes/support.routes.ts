import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, data: [
    { id: '1', subject: 'Unable to complete UPI transaction', category: 'Payment Issue', priority: 'HIGH', status: 'IN_PROGRESS', createdAt: '2026-07-14' },
    { id: '2', subject: 'Card not working at ATM', category: 'Card Issue', priority: 'MEDIUM', status: 'OPEN', createdAt: '2026-07-12' },
  ]});
});

router.post('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Ticket created successfully', data: { id: `TKT${Date.now()}`, ...req.body, status: 'OPEN' }});
});

router.get('/faq', authenticate, (req, res) => {
  res.json({ success: true, data: [
    { question: 'How to transfer money?', answer: 'Go to Transfer Money, enter recipient details and amount, then confirm.' },
    { question: 'How to block my card?', answer: 'Go to Cards, select your card, and click Block Card.' },
    { question: 'What is the transaction limit?', answer: 'IMPS: ₹5 lakh, NEFT: No limit, RTGS: ₹2 lakh minimum.' },
    { question: 'How to reset my UPI PIN?', answer: 'Go to UPI Settings, select Reset PIN, and follow the steps.' },
  ]});
});

export default router;
