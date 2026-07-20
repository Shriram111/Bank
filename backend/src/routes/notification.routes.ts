import { Router } from 'express';
import { authenticate } from '../middleware/auth';
const router = Router();

const notifications = [
  { id: '1', title: 'Payment Received', message: '₹85,000 salary credited from TCS', type: 'TRANSACTION', read: false, createdAt: '2026-07-14T09:00:00Z' },
  { id: '2', title: 'Security Alert', message: 'New login detected from Mumbai, India', type: 'SECURITY', read: true, createdAt: '2026-07-13T18:30:00Z' },
  { id: '3', title: 'Bill Reminder', message: 'Electricity bill of ₹1,850 due on Jul 20', type: 'GENERAL', read: false, createdAt: '2026-07-12T10:00:00Z' },
  { id: '4', title: 'Offer', message: 'Get 5% cashback on UPI payments this week!', type: 'PROMOTIONAL', read: true, createdAt: '2026-07-11T12:00:00Z' },
  { id: '5', title: 'Card Transaction', message: '₹2,499 spent on Amazon Shopping', type: 'TRANSACTION', read: false, createdAt: '2026-07-10T14:30:00Z' },
];

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, data: notifications });
});

router.get('/unread-count', authenticate, (req, res) => {
  res.json({ success: true, data: { count: notifications.filter(n => !n.read).length }});
});

router.post('/:id/read', authenticate, (req, res) => {
  res.json({ success: true, message: 'Notification marked as read' });
});

router.post('/read-all', authenticate, (req, res) => {
  res.json({ success: true, message: 'All notifications marked as read' });
});

router.delete('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Notification deleted' });
});

export default router;
