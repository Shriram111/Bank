import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Car, Plane, Umbrella, ChevronRight, FileText, Phone, CheckCircle } from 'lucide-react';

const insuranceProducts = [
  { id: 1, type: 'Health', icon: Heart, premium: 12999, coverage: '₹10 Lakh', title: 'Health Guard Plus', features: ['Cashless treatment', 'Pre & post hospitalization', 'Day care procedures', 'No claim bonus'], color: 'from-red-500 to-pink-600', bgLight: 'bg-red-50 dark:bg-red-900/20' },
  { id: 2, type: 'Life', icon: Shield, premium: 8499, coverage: '₹50 Lakh', title: 'Life Secure Term', features: ['Death benefit', 'Terminal illness benefit', 'Premium waiver', 'Tax benefits under 80C'], color: 'from-primary-500 to-blue-600', bgLight: 'bg-primary-50 dark:bg-primary-900/20' },
  { id: 3, type: 'Motor', icon: Car, premium: 4999, coverage: '₹3 Lakh IDV', title: 'Motor Comprehensive', features: ['Own damage cover', 'Third party liability', 'Roadside assistance', 'Zero depreciation'], color: 'from-accent-500 to-emerald-600', bgLight: 'bg-accent-50 dark:bg-accent-900/20' },
  { id: 4, type: 'Travel', icon: Plane, premium: 1299, coverage: '₹50,000', title: 'Travel Shield', features: ['Medical expenses', 'Trip cancellation', 'Lost baggage', 'Flight delay cover'], color: 'from-purple-500 to-violet-600', bgLight: 'bg-purple-50 dark:bg-purple-900/20' },
];

const myPolicies = [
  { id: 1, product: 'Health Guard Plus', provider: 'NeoBank Insurance', premium: 12999, status: 'active', renewal: 'Dec 2026', policyNo: 'NB-HL-2025-4892' },
  { id: 2, product: 'Motor Comprehensive', provider: 'NeoBank Insurance', premium: 4999, status: 'active', renewal: 'Sep 2026', policyNo: 'NB-MT-2025-7823' },
];

const Insurance = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Insurance</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Protect what matters most</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        {['products', 'my-policies'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {tab === 'products' ? 'Browse Products' : 'My Policies'}
          </button>
        ))}
      </div>

      {activeTab === 'products' && (
        <>
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {[null, 'Health', 'Life', 'Motor', 'Travel'].map((type) => (
              <button key={String(type)} onClick={() => setSelectedType(type)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedType === type ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                {type || 'All'}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {(selectedType ? insuranceProducts.filter((p) => p.type === selectedType) : insuranceProducts).map((product, i) => {
              const Icon = product.icon;
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="card-banking overflow-hidden">
                  <div className={`bg-gradient-to-r ${product.color} rounded-xl p-4 mb-4 text-white`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"><Icon size={20} /></div>
                      <div>
                        <p className="text-xs text-white/80">{product.type} Insurance</p>
                        <p className="font-semibold">{product.title}</p>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-white/60">Coverage</p>
                        <p className="text-lg font-bold">{product.coverage}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/60">Premium</p>
                        <p className="text-lg font-bold">₹{product.premium.toLocaleString()}/yr</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {product.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle size={14} className="text-accent-500 shrink-0" /> {feat}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <button className="btn-primary text-sm flex-1">Buy Now</button>
                    <button className="btn-outline text-sm px-4">Claim</button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'my-policies' && (
        <div className="space-y-4">
          {myPolicies.map((policy, i) => (
            <motion.div key={policy.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="card-banking">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-500"><Shield size={18} /></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{policy.product}</p>
                    <p className="text-xs text-gray-500">{policy.policyNo}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">Active</span>
              </div>
              <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div><p className="text-xs text-gray-500">Premium</p><p className="font-semibold text-gray-900 dark:text-white text-sm">₹{policy.premium.toLocaleString()}</p></div>
                <div><p className="text-xs text-gray-500">Provider</p><p className="font-semibold text-gray-900 dark:text-white text-sm">{policy.provider}</p></div>
                <div><p className="text-xs text-gray-500">Renewal</p><p className="font-semibold text-gray-900 dark:text-white text-sm">{policy.renewal}</p></div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="btn-ghost text-sm flex items-center gap-1"><FileText size={14} /> View Policy</button>
                <button className="btn-ghost text-sm flex items-center gap-1"><Phone size={14} /> Claim</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Insurance;
