import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
const router = Router();

router.get('/dashboard', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, data: {
    totalUsers: 1024567, activeUsers: 856432, totalTransactions: 12567890,
    totalVolume: 50000000000, revenue: 250000000, pendingTickets: 45,
    recentActivity: [
      { id: '1', action: 'New user registered', user: 'Ravi Kumar', time: '2 min ago' },
      { id: '2', action: 'Large transaction flagged', user: 'System Alert', time: '5 min ago' },
      { id: '3', action: 'Support ticket resolved', user: 'Support Team', time: '10 min ago' },
    ],
    systemHealth: { apiUptime: 99.99, avgResponseTime: 120, errorRate: 0.01, activeConnections: 45230 },
  }});
});

router.get('/users', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ success: true, data: [
    { id: '1', name: 'Ankit Kumar', email: 'ankit@neobank.cloud', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2026-07-15', accounts: 2, totalBalance: 245680 },
    { id: '2', name: 'Priya Sharma', email: 'priya@neobank.cloud', role: 'CUSTOMER', status: 'ACTIVE', lastLogin: '2026-07-14', accounts: 1, totalBalance: 125000 },
  ]});
});

export default router;
