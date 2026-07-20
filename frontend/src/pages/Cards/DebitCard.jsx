import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Unlock, Shield, ArrowUpRight, ArrowDownLeft, Settings, Eye, EyeOff, ChevronRight } from 'lucide-react';

const recentTransactions = [
  { id: 1, merchant: 'Swiggy', amount: 450, date: 'Today', type: 'debit' },
  { id: 2, merchant: 'Amazon', amount: 1299, date: 'Yesterday', type: 'debit' },
  { id: 3, merchant: 'Salary Credit', amount: 85000, date: 'Jul 1', type: 'credit' },
  { id: 4, merchant: 'ATM Withdrawal', amount: 5000, date: 'Jun 30', type: 'debit' },
];

const DebitCard = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(50000);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Debit Card</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your debit card settings</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${isBlocked ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-green-100 text-green-600 dark:bg-green-900/30'}`}>
          {isBlocked ? 'Blocked' : 'Active'}
        </span>
      </div>

      {/* Card Visual */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <span className="text-white/80 text-sm font-medium">NeoBank Platinum Debit</span>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">VISA</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-8 bg-yellow-400/80 rounded-md" />
            <div className="w-10 h-8 bg-yellow-400/60 rounded-md" />
          </div>
          <p className="font-mono text-xl tracking-[0.2em] mb-6">4589 •••• •••• 7823</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/50">Card Holder</p>
              <p className="text-sm font-medium">ANKIT SHARMA</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Valid Thru</p>
              <p className="text-sm font-medium">12/28</p>
            </div>
            <div>
              <p className="text-xs text-white/50">CVV</p>
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium">{showCVV ? '782' : '•••'}</p>
                <button onClick={() => setShowCVV(!showCVV)} className="text-white/60 hover:text-white">
                  {showCVV ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: isBlocked ? Unlock : Lock, label: isBlocked ? 'Unblock' : 'Block Card', action: () => setIsBlocked(!isBlocked), color: isBlocked ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600 dark:bg-red-900/20' },
          { icon: Settings, label: 'Change PIN', action: () => {}, color: 'bg-primary-50 text-primary-500 dark:bg-primary-900/20' },
          { icon: Shield, label: 'Set Limits', action: () => {}, color: 'bg-accent-50 text-accent-500 dark:bg-accent-900/20' },
          { icon: CreditCard, label: 'Card Details', action: () => {}, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
        ].map((ctrl, i) => {
          const Icon = ctrl.icon;
          return (
            <motion.button key={i} whileHover={{ y: -2 }} onClick={ctrl.action} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-lg transition-all">
              <div className={`w-10 h-10 ${ctrl.color} rounded-lg flex items-center justify-center`}>
                <Icon size={20} />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{ctrl.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Spending Limit */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-banking">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Spending Limit</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">₹0</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">₹{dailyLimit.toLocaleString()}</span>
        </div>
        <input type="range" min="10000" max="200000" step="5000" value={dailyLimit} onChange={(e) => setDailyLimit(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500" />
        <div className="flex justify-between mt-3">
          <span className="text-xs text-gray-400">Used: ₹12,450</span>
          <span className="text-xs text-accent-500 font-medium">Remaining: ₹{(dailyLimit - 12450).toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-banking">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Card Transactions</h3>
          <button className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">View All <ChevronRight size={14} /></button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === 'credit' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500 dark:bg-red-900/20'}`}>
                  {txn.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{txn.merchant}</p>
                  <p className="text-xs text-gray-500">{txn.date}</p>
                </div>
              </div>
              <span className={`font-semibold text-sm ${txn.type === 'credit' ? 'text-accent-500' : 'text-gray-900 dark:text-white'}`}>
                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DebitCard;
