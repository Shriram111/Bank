import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
const router = Router();

router.get('/dashboard', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), (req, res) => {
  res.json({ success: true, data: {
    stats: { totalUsers: 1024567, activeUsers: 856432, totalTransactions: 12567890, totalVolume: 50000000000, revenue: 250000000 },
    recentActivity: [
      { id: '1', action: 'New user registered', user: 'Ravi Kumar', time: '2 min ago' },
      { id: '2', action: 'Large transaction detected', user: 'System', time: '5 min ago' },
      { id: '3', action: 'Support ticket resolved', user: 'Support Team', time: '10 min ago' },
    ],
    systemHealth: { apiUptime: 99.99, avgResponseTime: 120, errorRate: 0.01, activeConnections: 45230 },
  }});
});

router.get('/users', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), (req, res) => {
  res.json({ success: true, data: [
    { id: '1', name: 'Shriram Kumar', email: 'shriram@neobank.cloud', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2026-07-15' },
    { id: '2', name: 'Priya Sharma', email: 'priya@neobank.cloud', role: 'CUSTOMER', status: 'ACTIVE', lastLogin: '2026-07-14' },
  ]});
});

export default router;
