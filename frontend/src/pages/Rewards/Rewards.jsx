import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, Trophy, ChevronRight, Ticket, ShoppingBag, Smartphone, Coffee, ArrowRight } from 'lucide-react';

const rewardHistory = [
  { id: 1, title: 'UPI Payment Bonus', points: 50, date: 'Today', type: 'earned' },
  { id: 2, title: 'Credit Card Spend', points: 120, date: 'Yesterday', type: 'earned' },
  { id: 3, title: 'Redeemed: Amazon Voucher', points: -500, date: 'Jul 14', type: 'redeemed' },
  { id: 4, title: 'Referral Bonus', points: 200, date: 'Jul 10', type: 'earned' },
  { id: 5, title: 'Bill Payment Reward', points: 30, date: 'Jul 8', type: 'earned' },
];

const redeemOptions = [
  { id: 1, title: 'Amazon Gift Card', points: 500, icon: ShoppingBag, color: 'bg-orange-50 text-orange-500 dark:bg-orange-900/20' },
  { id: 2, title: 'Mobile Recharge', points: 200, icon: Smartphone, color: 'bg-blue-50 text-blue-500 dark:bg-blue-900/20' },
  { id: 3, title: 'Flight Voucher', points: 2000, icon: Ticket, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
  { id: 4, title: 'Coffee Voucher', points: 100, icon: Coffee, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' },
];

const tiers = [
  { name: 'Bronze', min: 0, max: 999, color: 'from-amber-600 to-amber-700' },
  { name: 'Silver', min: 1000, max: 4999, color: 'from-gray-400 to-gray-500' },
  { name: 'Gold', min: 5000, max: 14999, color: 'from-yellow-500 to-yellow-600' },
  { name: 'Platinum', min: 15000, max: Infinity, color: 'from-primary-500 to-primary-600' },
];

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const totalPoints = 3250;
  const currentTier = tiers.find((t) => totalPoints >= t.min && totalPoints <= t.max);
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progressToNext = nextTier ? ((totalPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Rewards</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Earn and redeem reward points</p>
      </div>

      {/* Points Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Trophy size={18} className="text-yellow-300" />
            <span className="text-sm text-white/80">{currentTier.name} Member</span>
          </div>
          <div className="flex items-end gap-3 mb-4">
            <motion.p key={totalPoints} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-4xl font-bold font-display">{totalPoints.toLocaleString()}</motion.p>
            <span className="text-white/70 text-sm mb-1">Reward Points</span>
          </div>
          {nextTier && (
            <div>
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>{currentTier.name}</span>
                <span>{nextTier.name} ({nextTier.min.toLocaleString()} pts)</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progressToNext}%` }} transition={{ duration: 1 }} className="h-full bg-yellow-300 rounded-full" />
              </div>
              <p className="text-xs text-white/50 mt-1">{nextTier.min - totalPoints} more points to {nextTier.name}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        {['overview', 'history', 'redeem'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-banking">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Earn Points</h3>
            <div className="space-y-3">
              {[
                { action: 'UPI Payment', pts: '2x points', icon: '💳' },
                { action: 'Credit Card Spends', pts: '5 pts/₹100', icon: '🎯' },
                { action: 'Referral', pts: '200 pts', icon: '👥' },
                { action: 'Bill Payment', pts: '10 pts', icon: '📄' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.action}</span>
                  </div>
                  <span className="text-sm font-medium text-accent-500">{item.pts}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-banking">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Top Rewards</h3>
            <div className="space-y-3">
              {redeemOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div key={opt.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 ${opt.color} rounded-lg flex items-center justify-center`}><Icon size={16} /></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{opt.title}</p>
                        <p className="text-xs text-gray-500">{opt.points} points</p>
                      </div>
                    </div>
                    <button className="text-primary-500 hover:text-primary-600"><ChevronRight size={16} /></button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'history' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-banking">
          <div className="space-y-3">
            {rewardHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${item.type === 'earned' ? 'bg-green-50 text-green-500 dark:bg-green-900/20' : 'bg-red-50 text-red-500 dark:bg-red-900/20'}`}>
                    {item.type === 'earned' ? <Star size={16} /> : <Gift size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${item.type === 'earned' ? 'text-accent-500' : 'text-secondary-500'}`}>
                  {item.type === 'earned' ? '+' : ''}{item.points} pts
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'redeem' && (
        <div className="grid md:grid-cols-2 gap-4">
          {redeemOptions.map((opt, i) => {
            const Icon = opt.icon;
            const canRedeem = totalPoints >= opt.points;
            return (
              <motion.div key={opt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="card-banking">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${opt.color} rounded-xl flex items-center justify-center`}><Icon size={24} /></div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{opt.title}</p>
                    <p className="text-sm text-gray-500">{opt.points} points</p>
                  </div>
                </div>
                <button disabled={!canRedeem} className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${canRedeem ? 'btn-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}`}>
                  {canRedeem ? 'Redeem Now' : 'Insufficient Points'}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Rewards;
