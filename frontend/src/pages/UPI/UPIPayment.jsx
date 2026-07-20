import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QrCode, Send, History, Users, Plus, ArrowRight, Smartphone } from 'lucide-react';

const upiApps = [
  { name: 'NeoBank UPI', id: 'neobank@upi', color: 'from-primary-500 to-primary-600' },
];

const recentUpi = [
  { name: 'Rahul Sharma', upiId: 'rahul@okaxis', amount: 500, date: 'Today' },
  { name: 'Swiggy', upiId: 'swiggy@ybl', amount: 320, date: 'Yesterday' },
  { name: 'Amazon Pay', upiId: 'amazon@apl', amount: 1200, date: 'Jul 12' },
];

const UPIPayment = () => {
  const [upiId, setUpiId] = React.useState('');
  const [amount, setAmount] = React.useState('');

  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">UPI Payment</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Send & receive money via UPI</p>
      </div>

      {/* UPI ID Card */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
        <p className="text-white/80 text-sm mb-1">Your UPI ID</p>
        <p className="text-xl font-bold font-mono">9876543210@neobank</p>
        <div className="flex gap-3 mt-4">
          <button className="flex-1 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">Copy UPI ID</button>
          <button className="flex-1 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">Share QR</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Send, label: 'Send Money', path: '/dashboard/transfer' },
          { icon: QrCode, label: 'Scan QR', path: '/dashboard/upi/scan' },
          { icon: Users, label: 'Contacts', path: '/dashboard/upi' },
          { icon: History, label: 'History', path: '/dashboard/transactions' },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <Link key={i} to={action.path} className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
              <Icon size={24} className="text-primary-500" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Send Money */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Send Money</h3>
        <div className="space-y-3">
          <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="Enter UPI ID or Mobile Number" className="input-field" />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (₹)" className="input-field text-xl font-bold" />
          <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
            Send Money <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Recent UPI Transactions */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent UPI Payments</h3>
        <div className="space-y-3">
          {recentUpi.map((txn, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <Smartphone size={18} className="text-primary-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{txn.name}</p>
                  <p className="text-xs text-gray-500">{txn.upiId} • {txn.date}</p>
                </div>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">-₹{txn.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UPIPayment;
