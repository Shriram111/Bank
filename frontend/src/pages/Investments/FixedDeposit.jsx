import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Landmark, TrendingUp, Calendar, Plus, ChevronRight, Info, Clock } from 'lucide-react';

const existingFDs = [
  { id: 1, amount: 200000, rate: 6.5, tenure: 12, startDate: 'Jan 15, 2026', maturityDate: 'Jan 15, 2027', maturityAmount: 213000, status: 'active' },
  { id: 2, amount: 500000, rate: 7.0, tenure: 24, startDate: 'Mar 1, 2026', maturityDate: 'Mar 1, 2028', maturityAmount: 573000, status: 'active' },
  { id: 3, amount: 100000, rate: 6.25, tenure: 6, startDate: 'Oct 1, 2025', maturityDate: 'Apr 1, 2026', maturityAmount: 103125, status: 'matured' },
];

const FixedDeposit = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [newAmount, setNewAmount] = useState(100000);
  const [newTenure, setNewTenure] = useState(12);
  const [newRate] = useState(6.75);

  const calcMaturity = useMemo(() => {
    const principal = newAmount;
    const r = newRate / 100;
    const n = newTenure / 12;
    const maturity = principal * Math.pow(1 + r, n);
    const interest = maturity - principal;
    return { maturity: Math.round(maturity), interest: Math.round(interest) };
  }, [newAmount, newTenure, newRate]);

  const totalInvested = existingFDs.filter((f) => f.status === 'active').reduce((a, b) => a + b.amount, 0);
  const totalMaturity = existingFDs.filter((f) => f.status === 'active').reduce((a, b) => a + b.maturityAmount, 0);

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Fixed Deposits</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Grow your savings safely</p>
        </div>
        <button onClick={() => setShowCalculator(!showCalculator)} className="btn-primary text-sm flex items-center gap-2">
          <Plus size={16} /> New FD
        </button>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Total Invested', value: `₹${totalInvested.toLocaleString()}`, icon: Landmark, color: 'bg-primary-50 text-primary-500 dark:bg-primary-900/20' },
          { label: 'Maturity Value', value: `₹${totalMaturity.toLocaleString()}`, icon: TrendingUp, color: 'bg-accent-50 text-accent-500 dark:bg-accent-900/20' },
          { label: 'Active FDs', value: existingFDs.filter((f) => f.status === 'active').length, icon: Clock, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="card-banking">
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* New FD Calculator */}
      {showCalculator && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="card-banking border-2 border-primary-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Fixed Deposit</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Deposit Amount</label>
                <input type="number" value={newAmount} onChange={(e) => setNewAmount(Number(e.target.value))} className="input-field" min="5000" step="5000" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Tenure (months)</label>
                <input type="range" min="6" max="120" step="6" value={newTenure} onChange={(e) => setNewTenure(Number(e.target.value))} className="w-full accent-primary-500" />
                <div className="flex justify-between mt-1"><span className="text-xs text-gray-400">6m</span><span className="text-sm font-medium text-primary-500">{newTenure} months ({(newTenure / 12).toFixed(1)} years)</span><span className="text-xs text-gray-400">10y</span></div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2 mb-1"><Info size={14} className="text-primary-500" /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate: {newRate}% p.a.</span></div>
                <p className="text-xs text-gray-500">Compounded quarterly for better returns</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-xl p-6 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Maturity Amount</p>
              <motion.p key={calcMaturity.maturity} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-bold text-primary-600 dark:text-primary-400 font-display mb-4">₹{calcMaturity.maturity.toLocaleString()}</motion.p>
              <div className="text-center">
                <p className="text-xs text-gray-500">Interest Earned</p>
                <p className="text-lg font-semibold text-accent-500">+₹{calcMaturity.interest.toLocaleString()}</p>
              </div>
              <button className="btn-primary mt-4 w-full">Create FD</button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Existing FDs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-banking">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Fixed Deposits</h3>
        <div className="space-y-3">
          {existingFDs.map((fd, i) => (
            <div key={fd.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${fd.status === 'active' ? 'bg-primary-50 text-primary-500 dark:bg-primary-900/20' : 'bg-gray-200 text-gray-400 dark:bg-gray-700'}`}>
                  <Landmark size={18} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">₹{fd.amount.toLocaleString()} FD</p>
                  <p className="text-xs text-gray-500">{fd.rate}% · {fd.tenure} months · Started {fd.startDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{fd.maturityAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Matures {fd.maturityDate}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FixedDeposit;
