import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, MessageSquare, Phone, Mail, ChevronDown, ChevronUp, Send, FileText, Clock, CheckCircle, Plus } from 'lucide-react';

const faqs = [
  { q: 'How do I reset my UPI PIN?', a: 'Go to Settings > Security > Change PIN. You can reset your UPI PIN using your debit card details or Aadhaar verification.' },
  { q: 'How long does fund transfer take?', a: 'UPI transfers are instant. NEFT transfers take 2-4 hours during business hours. RTGS is processed within 30 minutes.' },
  { q: 'How do I block my card?', a: 'Go to Cards > Select your card > Block Card. You can also call our 24/7 helpline at 1800-XXX-XXXX for immediate blocking.' },
  { q: 'What is the daily transaction limit?', a: 'UPI limit is ₹1,00,000 per transaction. NEFT has no upper limit. RTGS minimum is ₹2,00,000. Card limits can be customized.' },
  { q: 'How do I download my account statement?', a: 'Go to Transactions > View All > Download Statement. Select the date range and format (PDF/CSV) and download instantly.' },
];

const tickets = [
  { id: 'TKT-2026-001', subject: 'UPI transaction failed but amount deducted', status: 'open', date: 'Jul 15, 2026' },
  { id: 'TKT-2026-002', subject: 'Unable to add beneficiary', status: 'resolved', date: 'Jul 10, 2026' },
];

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('faq');
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'general', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setTicketForm({ subject: '', category: 'general', description: '' }); }, 3000);
  };

  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Help & Support</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">We're here to help you</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, label: 'Live Chat', desc: 'Chat with us', color: 'bg-primary-50 text-primary-500 dark:bg-primary-900/20', action: () => {} },
          { icon: Phone, label: 'Call Us', desc: '1800-XXX-XXXX', color: 'bg-accent-50 text-accent-500 dark:bg-accent-900/20', action: () => {} },
          { icon: Mail, label: 'Email', desc: 'support@neobank.in', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20', action: () => {} },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button key={i} whileHover={{ y: -2 }} onClick={item.action} className="card-banking flex flex-col items-center gap-2 text-center hover:shadow-lg transition-all">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}><Icon size={24} /></div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        {['faq', 'tickets', 'new-ticket'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab === 'new-ticket' ? 'Raise Ticket' : tab === 'faq' ? 'FAQ' : 'My Tickets'}
          </button>
        ))}
      </div>

      {/* FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="card-banking">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between text-left">
                <span className="text-sm font-medium text-gray-900 dark:text-white pr-4">{faq.q}</span>
                {openFaq === i ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {/* My Tickets */}
      {activeTab === 'tickets' && (
        <div className="space-y-3">
          {tickets.map((ticket, i) => (
            <motion.div key={ticket.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="card-banking">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ticket.status === 'open' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' : 'bg-green-100 text-green-600 dark:bg-green-900/30'}`}>
                  {ticket.status === 'open' ? <span className="flex items-center gap-1"><Clock size={10} /> Open</span> : <span className="flex items-center gap-1"><CheckCircle size={10} /> Resolved</span>}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{ticket.subject}</p>
              <p className="text-xs text-gray-500 mt-1">{ticket.date}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* New Ticket Form */}
      {activeTab === 'new-ticket' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-banking">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-green-500" /></div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Ticket Submitted!</p>
              <p className="text-sm text-gray-500 mt-1">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Raise a Support Ticket</h3>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Subject</label>
                <input type="text" value={ticketForm.subject} onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })} className="input-field" placeholder="Brief description of your issue" required />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Category</label>
                <select value={ticketForm.category} onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })} className="input-field">
                  <option value="general">General Query</option>
                  <option value="transaction">Transaction Issue</option>
                  <option value="card">Card Related</option>
                  <option value="upi">UPI Issue</option>
                  <option value="account">Account Issue</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Description</label>
                <textarea value={ticketForm.description} onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })} className="input-field" rows={4} placeholder="Describe your issue in detail" required />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2"><Send size={16} /> Submit Ticket</button>
            </form>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Support;
