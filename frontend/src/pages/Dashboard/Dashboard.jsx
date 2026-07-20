import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Send,
  QrCode,
  Receipt,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const balanceData = [
  { month: 'Jan', balance: 45000 },
  { month: 'Feb', balance: 52000 },
  { month: 'Mar', balance: 48000 },
  { month: 'Apr', balance: 61000 },
  { month: 'May', balance: 55000 },
  { month: 'Jun', balance: 67000 },
  { month: 'Jul', balance: 72000 },
];

const transactions = [
  { id: 1, title: 'Amazon Shopping', category: 'Shopping', amount: -2499, date: 'Today', icon: '🛍️', color: 'bg-blue-50 text-blue-500' },
  { id: 2, title: 'Salary Credit', category: 'Income', amount: 85000, date: 'Yesterday', icon: '💰', color: 'bg-green-50 text-green-500' },
  { id: 3, title: 'Netflix Subscription', category: 'Entertainment', amount: -649, date: 'Jul 14', icon: '🎬', color: 'bg-red-50 text-red-500' },
  { id: 4, title: 'UPI to Rahul', category: 'Transfer', amount: -5000, date: 'Jul 13', icon: '💸', color: 'bg-purple-50 text-purple-500' },
  { id: 5, title: 'Electricity Bill', category: 'Utilities', amount: -1850, date: 'Jul 12', icon: '⚡', color: 'bg-yellow-50 text-yellow-500' },
];

const quickActions = [
  { icon: Send, label: 'Send Money', path: '/dashboard/transfer', color: 'bg-primary-500' },
  { icon: QrCode, label: 'Scan QR', path: '/dashboard/upi/scan', color: 'bg-accent-500' },
  { icon: Receipt, label: 'Pay Bills', path: '/dashboard/bills', color: 'bg-secondary-500' },
  { icon: CreditCard, label: 'Cards', path: '/dashboard/cards', color: 'bg-purple-500' },
];

const Dashboard = () => {
  const [showBalance, setShowBalance] = React.useState(true);

  return (
    <div className="page-transition space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
            Good Morning, Ankit 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's your financial overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
            ✓ Account Active
          </span>
        </div>
      </div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/80 text-sm font-medium">Total Balance</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <div className="mb-6">
            <p className="text-4xl md:text-5xl font-bold font-display">
              {showBalance ? '₹2,45,680.00' : '••••••••'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp size={16} className="text-green-300" />
              <span className="text-sm text-white/80">
                +₹12,500 (5.4%) this month
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/70 mb-1">Savings</p>
              <p className="font-semibold">₹1,85,420</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/70 mb-1">Current</p>
              <p className="font-semibold">₹60,260</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/70 mb-1">Fixed Deposit</p>
              <p className="font-semibold">₹2,00,000</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.path}
              className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-800"
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white`}>
                <Icon size={24} />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Charts and Transactions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Balance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Balance Trend</h3>
            <div className="flex gap-2">
              {['1W', '1M', '3M', '6M', '1Y'].map((period) => (
                <button
                  key={period}
                  className="px-3 py-1 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#004C8C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#004C8C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(v) => `₹${v/1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Balance']}
                />
                <Area type="monotone" dataKey="balance" stroke="#004C8C" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
            <Link to="/dashboard/transactions" className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${txn.color}`}>
                    {txn.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{txn.title}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${txn.amount > 0 ? 'text-accent-500' : 'text-gray-900 dark:text-white'}`}>
                  {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Cards & Offers */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white"
        >
          <h3 className="text-lg font-semibold mb-4">Your Card</h3>
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-white/80">NeoBank Platinum</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">VISA</span>
            </div>
            <p className="font-mono text-lg tracking-wider mb-4">•••• •••• •••• 4589</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/60">Valid Thru</p>
                <p className="text-sm font-medium">12/28</p>
              </div>
              <div>
                <p className="text-xs text-white/60">CVV</p>
                <p className="text-sm font-medium">•••</p>
              </div>
            </div>
          </div>
          <Link to="/dashboard/cards" className="block text-center py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-sm">
            View All Cards
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Special Offers</h3>
          <div className="space-y-3">
            {[
              { title: '5% Cashback', desc: 'On all UPI payments', color: 'bg-accent-500' },
              { title: 'Zero Fee', desc: 'On NEFT transfers', color: 'bg-primary-500' },
              { title: '2x Rewards', desc: 'On credit card spends', color: 'bg-secondary-500' },
            ].map((offer, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className={`w-10 h-10 ${offer.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{offer.title}</p>
                  <p className="text-xs text-gray-500">{offer.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/dashboard/offers" className="block text-center mt-4 py-2 text-primary-500 hover:text-primary-600 text-sm font-medium">
            View All Offers →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
