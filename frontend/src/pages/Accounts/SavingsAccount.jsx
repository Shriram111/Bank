import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, Download, TrendingUp, ChevronRight } from 'lucide-react';

const transactions = [
  { id: 1, title: 'Salary Credit', amount: 85000, date: 'Jul 15, 2025', type: 'credit', icon: '💰' },
  { id: 2, title: 'Amazon Shopping', amount: -2499, date: 'Jul 14, 2025', type: 'debit', icon: '🛍️' },
  { id: 3, title: 'UPI Received', amount: 5000, date: 'Jul 13, 2025', type: 'credit', icon: '💸' },
  { id: 4, title: 'Electricity Bill', amount: -1850, date: 'Jul 12, 2025', type: 'debit', icon: '⚡' },
  { id: 5, title: 'Netflix', amount: -649, date: 'Jul 11, 2025', type: 'debit', icon: '🎬' },
  { id: 6, title: 'Freelance Payment', amount: 15000, date: 'Jul 10, 2025', type: 'credit', icon: '💻' },
  { id: 7, title: 'Grocery Store', amount: -3200, date: 'Jul 9, 2025', type: 'debit', icon: '🛒' },
];

const SavingsAccount = () => {
  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Savings Account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Account ending in ••••4589</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30">
          <Download size={16} /> Download Statement
        </button>
      </div>

      {/* Balance Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><Wallet size={24} /></div>
            <div>
              <p className="text-white/80 text-sm">Savings Account</p>
              <p className="font-mono text-sm">NeoBank ••••4589</p>
            </div>
          </div>
          <p className="text-3xl font-bold font-display mb-2">₹1,85,420.00</p>
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-green-300" />
            <span className="text-sm text-white/80">+₹8,500 this month</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: ArrowUpRight, label: 'Send Money', path: '/dashboard/transfer', color: 'bg-primary-500' },
          { icon: ArrowDownLeft, label: 'Receive', path: '/dashboard/transfer', color: 'bg-accent-500' },
          { icon: Copy, label: 'Account Details', path: '/dashboard/accounts', color: 'bg-purple-500' },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <Link key={i} to={action.path} className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white`}><Icon size={20} /></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          <Link to="/dashboard/transactions" className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="space-y-3">
          {transactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${txn.type === 'credit' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>{txn.icon}</div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{txn.title}</p>
                  <p className="text-xs text-gray-500">{txn.date}</p>
                </div>
              </div>
              <span className={`font-semibold ${txn.type === 'credit' ? 'text-accent-500' : 'text-gray-900 dark:text-white'}`}>
                {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingsAccount;
