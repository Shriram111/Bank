import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Building2, ArrowRight, Check, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const beneficiaries = [
  { id: 1, name: 'Rahul Sharma', bank: 'HDFC Bank', account: '••••5678', ifsc: 'HDFC0001234' },
  { id: 2, name: 'Priya Patel', bank: 'ICICI Bank', account: '••••9012', ifsc: 'ICIC0005678' },
  { id: 3, name: 'Amit Kumar', bank: 'SBI', account: '••••3456', ifsc: 'SBIN0009012' },
];

const MoneyTransfer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    from: '', to: '', amount: '', note: '', method: 'imps',
  });
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1 && formData.to && formData.amount) {
      setStep(2);
    } else if (step === 2) {
      toast.success('Transfer initiated successfully!');
      setStep(3);
    }
  };

  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Money Transfer</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Send money instantly to anyone</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {['Recipient', 'Confirm', 'Done'].map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step > i + 1 ? 'bg-accent-500 text-white' : step === i + 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                {step > i + 1 ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${step === i + 1 ? 'text-primary-500' : 'text-gray-500'}`}>{s}</span>
            </div>
            {i < 2 && <div className={`w-16 h-0.5 ${step > i + 1 ? 'bg-accent-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto">
          {/* Beneficiaries */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Select Beneficiary</h3>
            <div className="space-y-3">
              {beneficiaries.map((b) => (
                <button
                  key={b.id}
                  onClick={() => { setSelectedBeneficiary(b); setFormData({ ...formData, to: b.name }); }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    selectedBeneficiary?.id === b.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <User size={18} className="text-primary-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">{b.name}</p>
                      <p className="text-sm text-gray-500">{b.bank} • {b.account}</p>
                    </div>
                  </div>
                  <Building2 size={18} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Transfer Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount (₹)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="text-3xl font-bold text-center input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Note (Optional)</label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="What's this for?"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transfer Method</label>
              <div className="grid grid-cols-3 gap-3">
                {['imps', 'neft', 'rtgs'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setFormData({ ...formData, method: m })}
                    className={`p-3 rounded-xl border-2 text-center font-medium uppercase text-sm ${
                      formData.method === m ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-500' : 'border-gray-100 dark:border-gray-800'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={!selectedBeneficiary || !formData.amount} className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50">
              Continue <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-lg mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-4">Confirm Transfer</h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between"><span className="text-gray-500">To</span><span className="font-medium text-gray-900 dark:text-white">{formData.to}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-bold text-xl text-gray-900 dark:text-white">₹{Number(formData.amount).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Method</span><span className="font-medium uppercase text-gray-900 dark:text-white">{formData.method}</span></div>
              {formData.note && <div className="flex justify-between"><span className="text-gray-500">Note</span><span className="text-gray-900 dark:text-white">{formData.note}</span></div>}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 btn-outline">Back</button>
              <button onClick={handleSubmit} className="flex-1 btn-primary">Confirm & Send</button>
            </div>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
            <div className="w-20 h-20 bg-accent-50 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} className="text-accent-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-2">Transfer Successful!</h3>
            <p className="text-gray-500 mb-6">₹{Number(formData.amount).toLocaleString()} has been sent to {formData.to}</p>
            <p className="text-sm text-gray-400 mb-6">Reference: TXN{Date.now()}</p>
            <button onClick={() => { setStep(1); setFormData({ from: '', to: '', amount: '', note: '', method: 'imps' }); setSelectedBeneficiary(null); }} className="btn-primary">
              New Transfer
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MoneyTransfer;
