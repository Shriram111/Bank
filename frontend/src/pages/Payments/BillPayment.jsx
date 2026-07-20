import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Wifi, Tv, Car, Droplets, CreditCard, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const billCategories = [
  { icon: Zap, label: 'Electricity', color: 'bg-yellow-50 text-yellow-500' },
  { icon: Droplets, label: 'Water', color: 'bg-blue-50 text-blue-500' },
  { icon: Wifi, label: 'Internet', color: 'bg-purple-50 text-purple-500' },
  { icon: Tv, label: 'DTH/Cable', color: 'bg-red-50 text-red-500' },
  { icon: Car, label: 'FASTag', color: 'bg-green-50 text-green-500' },
  { icon: Smartphone, label: 'Mobile', color: 'bg-pink-50 text-pink-500' },
  { icon: CreditCard, label: 'Credit Card', color: 'bg-orange-50 text-orange-500' },
];

const BillPayment = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [formData, setFormData] = React.useState({ provider: '', accountNumber: '', amount: '' });

  const handlePay = (e) => {
    e.preventDefault();
    toast.success('Bill payment initiated!');
  };

  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Bill Payment</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Pay your bills instantly</p>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
        {billCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                selectedCategory === cat.label ? 'bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-500' : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800'
              }`}
            >
              <div className={`w-12 h-12 ${cat.color} rounded-full flex items-center justify-center`}>
                <Icon size={24} />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {selectedCategory && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
          <form onSubmit={handlePay} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Pay {selectedCategory} Bill</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Provider</label>
              <select value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} className="input-field">
                <option value="">Select Provider</option>
                <option value="bSES">BSES Delhi</option>
                <option value="adani">Adani Electricity</option>
                <option value="tata">Tata Power</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Consumer Number</label>
              <input type="text" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} placeholder="Enter consumer number" className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount (₹)</label>
              <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="0.00" className="input-field text-xl font-bold" required />
            </div>
            <button type="submit" className="w-full btn-primary py-4">Pay Now</button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default BillPayment;
