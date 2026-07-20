import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Filter, Download, Search } from 'lucide-react';

const allTransactions = [
  { id: 1, title: 'Amazon Shopping', category: 'Shopping', amount: -2499, date: 'Jul 15, 2026', time: '2:30 PM', status: 'completed', icon: '🛍️' },
  { id: 2, title: 'Salary Credit - TCS', category: 'Income', amount: 85000, date: 'Jul 14, 2026', time: '9:00 AM', status: 'completed', icon: '💰' },
  { id: 3, title: 'Netflix Subscription', category: 'Entertainment', amount: -649, date: 'Jul 13, 2026', time: '12:00 AM', status: 'completed', icon: '🎬' },
  { id: 4, title: 'UPI to Rahul Sharma', category: 'Transfer', amount: -5000, date: 'Jul 12, 2026', time: '6:45 PM', status: 'completed', icon: '💸' },
  { id: 5, title: 'Electricity Bill - BSES', category: 'Utilities', amount: -1850, date: 'Jul 11, 2026', time: '10:20 AM', status: 'completed', icon: '⚡' },
  { id: 6, title: 'Swiggy Order', category: 'Food', amount: -456, date: 'Jul 10, 2026', time: '8:15 PM', status: 'completed', icon: '🍔' },
  { id: 7, title: 'Refund - Myntra', category: 'Refund', amount: 1299, date: 'Jul 9, 2026', time: '3:00 PM', status: 'completed', icon: '↩️' },
  { id: 8, title: 'ATM Withdrawal', category: 'Cash', amount: -10000, date: 'Jul 8, 2026', time: '11:30 AM', status: 'completed', icon: '🏧' },
  { id: 9, title: 'Zomato Order', category: 'Food', amount: -320, date: 'Jul 7, 2026', time: '7:45 PM', status: 'completed', icon: '🍕' },
  { id: 10, title: 'Freelance Payment', category: 'Income', amount: 15000, date: 'Jul 6, 2026', time: '2:00 PM', status: 'completed', icon: '💼' },
];

const TransactionHistory = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allTransactions.filter((txn) => {
    const matchesFilter = filter === 'all' || (filter === 'credit' && txn.amount > 0) || (filter === 'debit' && txn.amount < 0);
    const matchesSearch = txn.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Transactions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">View all your transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'credit', 'debit'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {filtered.map((txn, index) => (
          <motion.div
            key={txn.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-xl">
                {txn.icon}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{txn.title}</p>
                <p className="text-sm text-gray-500">{txn.category} • {txn.date} • {txn.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${txn.amount > 0 ? 'text-accent-500' : 'text-gray-900 dark:text-white'}`}>
                {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
              </p>
              <span className="text-xs text-green-500 capitalize">{txn.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
