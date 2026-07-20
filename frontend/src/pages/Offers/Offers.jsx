import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Percent, Zap, Gift, ChevronRight, Clock, Copy, CheckCircle } from 'lucide-react';

const offers = [
  { id: 1, title: '5% Cashback on UPI', description: 'Get 5% cashback on all UPI payments above ₹200. Max cashback ₹100.', code: 'UPI5', expiry: 'Jul 31, 2026', category: 'UPI', color: 'from-accent-500 to-emerald-600' },
  { id: 2, title: 'Zero Fee on NEFT', description: 'Enjoy zero transaction fees on all NEFT transfers this month.', code: 'NEFT0', expiry: 'Jul 25, 2026', category: 'Transfer', color: 'from-primary-500 to-blue-600' },
  { id: 3, title: '2x Reward Points on Cards', description: 'Earn double reward points on all credit card transactions above ₹500.', code: '2XREWARD', expiry: 'Aug 15, 2026', category: 'Cards', color: 'from-secondary-500 to-pink-600' },
  { id: 4, title: '₹200 Off on Insurance', description: 'Get ₹200 instant discount on first insurance premium payment.', code: 'INS200', expiry: 'Aug 10, 2026', category: 'Insurance', color: 'from-purple-500 to-violet-600' },
  { id: 5, title: '10% Cashback on Recharge', description: 'Get 10% cashback on mobile recharges above ₹199.', code: 'RECH10', expiry: 'Jul 28, 2026', category: 'Recharge', color: 'from-amber-500 to-orange-600' },
  { id: 6, title: 'Flat ₹500 Off on Flight Booking', description: 'Use NeoBank UPI to book flights and get flat ₹500 off.', code: 'FLY500', expiry: 'Aug 31, 2026', category: 'Travel', color: 'from-cyan-500 to-blue-600' },
];

const Offers = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const categories = ['all', ...new Set(offers.map((o) => o.category))];
  const filtered = activeCategory === 'all' ? offers : offers.filter((o) => o.category === activeCategory);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Offers & Deals</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Exclusive offers just for you</p>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            {cat === 'all' ? 'All Offers' : cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((offer, i) => (
          <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} whileHover={{ y: -4 }} className="card-banking overflow-hidden">
            <div className={`bg-gradient-to-r ${offer.color} rounded-xl p-4 mb-4 text-white`}>
              <div className="flex items-center gap-2 mb-2">
                <Tag size={16} />
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{offer.category}</span>
              </div>
              <h3 className="text-lg font-bold">{offer.title}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{offer.description}</p>
            <div className="flex items-center justify-between">
              <button onClick={() => handleCopy(offer.code, offer.id)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{offer.code}</span>
                {copiedId === offer.id ? <CheckCircle size={14} className="text-accent-500" /> : <Copy size={14} className="text-gray-400" />}
              </button>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={12} />
                <span>Expires {offer.expiry}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
