import React from 'react';
import toast from 'react-hot-toast';

const Recharge = () => {
  const [formData, setFormData] = React.useState({ type: 'mobile', number: '', operator: '', amount: '' });
  const operators = ['Jio', 'Airtel', 'Vi (Vodafone Idea)', 'BSNL'];

  const handleRecharge = (e) => {
    e.preventDefault();
    toast.success('Recharge initiated successfully!');
  };

  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Recharge</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Mobile, DTH & Data Card Recharge</p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="flex gap-2 mb-6">
          {['mobile', 'dth', 'datacard'].map((t) => (
            <button key={t} onClick={() => setFormData({ ...formData, type: t })} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${formData.type === t ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleRecharge} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{formData.type === 'mobile' ? 'Mobile Number' : formData.type === 'dth' ? 'DTH Number' : 'Data Card Number'}</label>
            <input type="tel" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} placeholder="Enter number" className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Operator</label>
            <select value={formData.operator} onChange={(e) => setFormData({ ...formData, operator: e.target.value })} className="input-field" required>
              <option value="">Select Operator</option>
              {operators.map((op) => <option key={op} value={op}>{op}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount (₹)</label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[199, 399, 599, 999].map((a) => (
                <button key={a} type="button" onClick={() => setFormData({ ...formData, amount: a.toString() })} className={`py-2 rounded-lg text-sm font-medium border-2 transition-colors ${formData.amount === a.toString() ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-500' : 'border-gray-200 dark:border-gray-700'}`}>
                  ₹{a}
                </button>
              ))}
            </div>
            <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="Custom amount" className="input-field" required />
          </div>
          <button type="submit" className="w-full btn-primary py-4">Recharge Now</button>
        </form>
      </div>
    </div>
  );
};

export default Recharge;
