import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard as CreditCardIcon, Calendar, DollarSign, AlertTriangle, ArrowUpRight, ArrowDownLeft, ChevronRight, TrendingUp, Wallet } from 'lucide-react';

const recentTransactions = [
  { id: 1, merchant: 'Flipkart', amount: 4999, date: 'Today', category: 'Shopping' },
  { id: 2, merchant: 'IRCTC', amount: 1250, date: 'Yesterday', category: 'Travel' },
  { id: 3, merchant: 'Zomato', amount: 680, date: 'Jul 14', category: 'Food' },
  { id: 4, merchant: 'Electricity Board', amount: 2100, date: 'Jul 12', category: 'Utilities' },
];

const CreditCard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const creditLimit = 200000;
  const outstanding = 47529;
  const minDue = 2376;
  const dueDate = 'Jul 25, 2026';
  const utilized = (outstanding / creditLimit) * 100;

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Credit Card</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your credit card</p>
        </div>
        <button className="btn-primary text-sm">Pay Now</button>
      </div>

      {/* Card Visual */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-secondary-500 via-secondary-600 to-red-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <span className="text-white/80 text-sm font-medium">NeoBank Rewards Credit</span>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">VISA Platinum</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-8 bg-yellow-400/80 rounded-md" />
            <div className="w-10 h-8 bg-yellow-400/60 rounded-md" />
          </div>
          <p className="font-mono text-xl tracking-[0.2em] mb-6">5412 •••• •••• 3456</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/50">Card Holder</p>
              <p className="text-sm font-medium">ANKIT SHARMA</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Valid Thru</p>
              <p className="text-sm font-medium">09/29</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Credit Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Wallet, label: 'Credit Limit', value: `₹${creditLimit.toLocaleString()}`, color: 'bg-primary-50 text-primary-500 dark:bg-primary-900/20' },
          { icon: AlertTriangle, label: 'Outstanding', value: `₹${outstanding.toLocaleString()}`, color: 'bg-secondary-50 text-secondary-500 dark:bg-secondary-900/20' },
          { icon: Calendar, label: 'Payment Due', value: dueDate, color: 'bg-accent-50 text-accent-500 dark:bg-accent-900/20' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="card-banking">
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Utilization Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-banking">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Credit Utilization</h3>
          <span className={`text-sm font-medium ${utilized > 70 ? 'text-secondary-500' : 'text-accent-500'}`}>{utilized.toFixed(1)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${utilized}%` }} transition={{ duration: 1, ease: 'easeOut' }} className={`h-full rounded-full ${utilized > 70 ? 'bg-secondary-500' : 'bg-accent-500'}`} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">₹0</span>
          <span className="text-xs text-gray-400">₹{creditLimit.toLocaleString()}</span>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl flex items-center gap-2">
          <AlertTriangle size={16} className="text-yellow-500" />
          <p className="text-sm text-yellow-700 dark:text-yellow-400">Minimum amount due: ₹{minDue.toLocaleString()} by {dueDate}</p>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-banking">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          <button className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">View All <ChevronRight size={14} /></button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500">
                  <ArrowUpRight size={18} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{txn.merchant}</p>
                  <p className="text-xs text-gray-500">{txn.date} · {txn.category}</p>
                </div>
              </div>
              <span className="font-semibold text-sm text-gray-900 dark:text-white">-₹{txn.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CreditCard;
