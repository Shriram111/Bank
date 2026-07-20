import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, data: [
    { id: '1', type: 'DEBIT', lastFour: '4589', brand: 'VISA', name: 'NeoBank Platinum Debit', expiry: '12/28', limit: 500000, spent: 125000, status: 'ACTIVE' },
    { id: '2', type: 'CREDIT', lastFour: '7823', brand: 'Mastercard', name: 'NeoBank Gold Credit', expiry: '08/27', limit: 200000, outstanding: 45000, minDue: 2500, dueDate: '2026-08-05', status: 'ACTIVE' },
  ]});
});

router.get('/debit', authenticate, (req, res) => {
  res.json({ success: true, data: [{ id: '1', type: 'DEBIT', lastFour: '4589', brand: 'VISA', name: 'NeoBank Platinum Debit', expiry: '12/28', limit: 500000, spent: 125000, status: 'ACTIVE' }]});
});

router.get('/credit', authenticate, (req, res) => {
  res.json({ success: true, data: [{ id: '2', type: 'CREDIT', lastFour: '7823', brand: 'Mastercard', name: 'NeoBank Gold Credit', expiry: '08/27', limit: 200000, outstanding: 45000, minDue: 2500, dueDate: '2026-08-05', status: 'ACTIVE' }]});
});

router.post('/:id/block', authenticate, (req, res) => {
  res.json({ success: true, message: 'Card blocked successfully' });
});

router.post('/:id/unblock', authenticate, (req, res) => {
  res.json({ success: true, message: 'Card unblocked successfully' });
});

router.post('/:id/change-pin', authenticate, (req, res) => {
  res.json({ success: true, message: 'PIN changed successfully' });
});

export default router;
