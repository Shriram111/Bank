import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, TrendingDown, Calendar, Percent, ChevronRight, ArrowRight, Clock, CheckCircle } from 'lucide-react';

const loans = [
  { id: 1, type: 'Home Loan', amount: 2500000, outstanding: 1875000, emi: 28500, tenure: 240, remaining: 180, rate: 8.5, paid: 60, status: 'active' },
  { id: 2, type: 'Car Loan', amount: 800000, outstanding: 320000, emi: 16200, tenure: 60, remaining: 22, rate: 9.25, paid: 38, status: 'active' },
  { id: 3, type: 'Personal Loan', amount: 200000, outstanding: 0, emi: 8800, tenure: 36, remaining: 0, rate: 11.5, paid: 36, status: 'closed' },
];

const schedule = [
  { emi: 181, date: 'Aug 2026', principal: 15200, interest: 13300, total: 28500, balance: 1859800 },
  { emi: 182, date: 'Sep 2026', principal: 15308, interest: 13192, total: 28500, balance: 1844492 },
  { emi: 183, date: 'Oct 2026', principal: 15417, interest: 13083, total: 28500, balance: 1829075 },
  { emi: 184, date: 'Nov 2026', principal: 15527, interest: 12973, total: 28500, balance: 1813548 },
];

const LoanDashboard = () => {
  const [selectedLoan, setSelectedLoan] = useState(0);
  const activeLoans = loans.filter((l) => l.status === 'active');
  const totalOutstanding = activeLoans.reduce((acc, l) => acc + l.outstanding, 0);
  const totalEMI = activeLoans.reduce((acc, l) => acc + l.emi, 0);

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">My Loans</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your loans</p>
        </div>
        <button className="btn-primary text-sm">Apply New Loan</button>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Total Outstanding', value: `₹${totalOutstanding.toLocaleString()}`, icon: TrendingDown, color: 'bg-secondary-50 text-secondary-500 dark:bg-secondary-900/20' },
          { label: 'Monthly EMI', value: `₹${totalEMI.toLocaleString()}`, icon: Calendar, color: 'bg-primary-50 text-primary-500 dark:bg-primary-900/20' },
          { label: 'Active Loans', value: activeLoans.length, icon: Landmark, color: 'bg-accent-50 text-accent-500 dark:bg-accent-900/20' },
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

      {/* Loan Cards */}
      <div className="space-y-4">
        {loans.map((loan, i) => (
          <motion.div key={loan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i }} className={`card-banking cursor-pointer ${selectedLoan === i ? 'ring-2 ring-primary-500' : ''}`} onClick={() => setSelectedLoan(i)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${loan.status === 'closed' ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' : 'bg-primary-50 text-primary-500 dark:bg-primary-900/20'}`}>
                  <Landmark size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{loan.type}</p>
                  <p className="text-xs text-gray-500">₹{loan.amount.toLocaleString()} · {loan.rate}% p.a.</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${loan.status === 'active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}>
                {loan.status === 'active' ? 'Active' : 'Closed'}
              </span>
            </div>
            {loan.status === 'active' && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">EMI</p>
                  <p className="font-semibold text-gray-900 dark:text-white">₹{loan.emi.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Outstanding</p>
                  <p className="font-semibold text-gray-900 dark:text-white">₹{(loan.outstanding / 100000).toFixed(1)}L</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tenure</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{loan.remaining}/{loan.tenure} mo</p>
                </div>
              </div>
            )}
            {loan.status === 'active' && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Repaid {loan.paid} EMIs</span>
                  <span>{((loan.paid / loan.tenure) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(loan.paid / loan.tenure) * 100}%` }} transition={{ duration: 1 }} className="h-full bg-primary-500 rounded-full" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Repayment Schedule */}
      {loans[selectedLoan].status === 'active' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-banking">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming EMI Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 font-medium">EMI #</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Principal</th>
                  <th className="pb-3 font-medium">Interest</th>
                  <th className="pb-3 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-gray-800/50">
                    <td className="py-3 text-gray-900 dark:text-white font-medium">{row.emi}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{row.date}</td>
                    <td className="py-3 text-gray-900 dark:text-white">₹{row.principal.toLocaleString()}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">₹{row.interest.toLocaleString()}</td>
                    <td className="py-3 text-gray-900 dark:text-white">₹{row.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LoanDashboard;
