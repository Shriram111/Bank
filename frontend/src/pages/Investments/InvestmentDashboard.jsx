import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, PieChart, Wallet, ArrowUpRight, ChevronRight, BarChart3 } from 'lucide-react';
import { PieChart as RePie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const portfolio = [
  { id: 1, name: 'HDFC Mid-Cap Fund', type: 'Mutual Fund', invested: 150000, current: 192000, returnPct: 28, color: '#004C8C' },
  { id: 2, name: 'Reliance Industries', type: 'Stock', invested: 80000, current: 95000, returnPct: 18.75, color: '#00A86B' },
  { id: 3, name: 'SGB Gold Bond', type: 'Gold', invested: 100000, current: 118000, returnPct: 18, color: '#E31837' },
  { id: 4, name: 'HDFC Bank FD', type: 'Fixed Deposit', invested: 200000, current: 218000, returnPct: 9, color: '#7C3AED' },
];

const InvestmentDashboard = () => {
  const [filter, setFilter] = useState('all');
  const totalInvested = portfolio.reduce((a, b) => a + b.invested, 0);
  const totalCurrent = portfolio.reduce((a, b) => a + b.current, 0);
  const totalReturns = totalCurrent - totalInvested;
  const returnPct = ((totalReturns / totalInvested) * 100).toFixed(1);

  const filtered = filter === 'all' ? portfolio : portfolio.filter((p) => p.type.toLowerCase() === filter);
  const pieData = portfolio.map((p) => ({ name: p.type, value: p.current, color: p.color }));

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${val.toLocaleString()}`;
  };

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Investments</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Your investment portfolio</p>
        </div>
        <button className="btn-primary text-sm">Invest Now</button>
      </div>

      {/* Portfolio Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-accent-500 via-accent-600 to-green-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Total Invested</p>
            <p className="text-2xl font-bold font-display">{formatCurrency(totalInvested)}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Current Value</p>
            <p className="text-2xl font-bold font-display">{formatCurrency(totalCurrent)}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Total Returns</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold font-display">+{formatCurrency(totalReturns)}</p>
              <span className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
                <TrendingUp size={14} /> +{returnPct}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs & Pie Chart */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-4">
            {['all', 'mutual fund', 'stock', 'gold', 'fixed deposit'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="card-banking flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                    <BarChart3 size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{formatCurrency(item.current)}</p>
                  <p className={`text-xs font-medium flex items-center justify-end gap-1 ${item.returnPct >= 0 ? 'text-accent-500' : 'text-secondary-500'}`}>
                    {item.returnPct >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {item.returnPct >= 0 ? '+' : ''}{item.returnPct}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Allocation Pie */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-banking">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Asset Allocation</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RePie>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
              </RePie>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {portfolio.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{p.type}</span>
                </div>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{((p.current / totalCurrent) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestmentDashboard;
