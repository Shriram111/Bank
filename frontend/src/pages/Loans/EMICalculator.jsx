import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Percent, Calendar, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(240);

  const calculation = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;
    return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest) };
  }, [principal, rate, tenure]);

  const pieData = [
    { name: 'Principal', value: principal, color: '#004C8C' },
    { name: 'Interest', value: calculation.totalInterest, color: '#E31837' },
  ];

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString()}`;
  };

  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">EMI Calculator</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Calculate your monthly EMI instantly</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card-banking space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Loan Amount</label>
              <span className="text-sm font-bold text-primary-500">{formatCurrency(principal)}</span>
            </div>
            <input type="range" min="100000" max="50000000" step="50000" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500" />
            <div className="flex justify-between mt-1"><span className="text-xs text-gray-400">₹1L</span><span className="text-xs text-gray-400">₹5Cr</span></div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate (% p.a.)</label>
              <span className="text-sm font-bold text-primary-500">{rate}%</span>
            </div>
            <input type="range" min="5" max="20" step="0.25" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500" />
            <div className="flex justify-between mt-1"><span className="text-xs text-gray-400">5%</span><span className="text-xs text-gray-400">20%</span></div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Loan Tenure</label>
              <span className="text-sm font-bold text-primary-500">{tenure} months ({Math.floor(tenure / 12)}y {tenure % 12}m)</span>
            </div>
            <input type="range" min="12" max="360" step="12" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500" />
            <div className="flex justify-between mt-1"><span className="text-xs text-gray-400">1 Year</span><span className="text-xs text-gray-400">30 Years</span></div>
          </div>
        </motion.div>

        {/* Result Section */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          {/* EMI Result */}
          <motion.div key={calculation.emi} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center">
              <p className="text-white/80 text-sm mb-2">Monthly EMI</p>
              <motion.p key={calculation.emi} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl font-bold font-display">
                ₹{calculation.emi.toLocaleString()}
              </motion.p>
              <p className="text-white/60 text-xs mt-2">Payable every month for {tenure} months</p>
            </div>
          </motion.div>

          {/* Breakdown Cards */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-banking">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center"><DollarSign size={16} className="text-primary-500" /></div>
                <p className="text-xs text-gray-500">Principal Amount</p>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(principal)}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card-banking">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-secondary-50 rounded-lg flex items-center justify-center"><Percent size={16} className="text-secondary-500" /></div>
                <p className="text-xs text-gray-500">Total Interest</p>
              </div>
              <p className="text-lg font-bold text-secondary-500">{formatCurrency(calculation.totalInterest)}</p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-banking">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-accent-50 rounded-lg flex items-center justify-center"><TrendingUp size={16} className="text-accent-500" /></div>
              <p className="text-xs text-gray-500">Total Payment</p>
            </div>
            <p className="text-lg font-bold text-accent-500">{formatCurrency(calculation.totalPayment)}</p>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card-banking">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Payment Breakup</h3>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={4} dataKey="value">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{item.name}</span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">{((item.value / calculation.totalPayment) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EMICalculator;
