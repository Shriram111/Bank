import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, CheckCheck, Trash2, ArrowUpRight, ArrowDownLeft, Gift, Shield, Tag } from 'lucide-react';

const initialNotifications = [
  { id: 1, title: 'Payment Received', message: '₹5,000 received from Rahul via UPI', time: '2 min ago', read: false, type: 'credit' },
  { id: 2, title: 'Card Transaction', message: '₹2,499 spent on Amazon Shopping', time: '1 hour ago', read: false, type: 'debit' },
  { id: 3, title: 'EMI Reminder', message: 'Your Home Loan EMI of ₹28,500 is due on Aug 5', time: '3 hours ago', read: false, type: 'reminder' },
  { id: 4, title: 'Reward Earned', message: 'You earned 50 reward points for UPI payment', time: 'Yesterday', read: true, type: 'reward' },
  { id: 5, title: 'Security Alert', message: 'New login detected from Chrome on Windows', time: 'Yesterday', read: true, type: 'security' },
  { id: 6, title: 'Offer Available', message: 'Get 5% cashback on all UPI payments this week', time: '2 days ago', read: true, type: 'offer' },
  { id: 7, title: 'Account Statement', message: 'Your July 2026 statement is ready to download', time: '3 days ago', read: true, type: 'info' },
];

const typeIcons = { credit: ArrowDownLeft, debit: ArrowUpRight, reminder: Bell, reward: Gift, security: Shield, offer: Tag, info: Bell };
const typeColors = { credit: 'bg-green-50 text-green-500 dark:bg-green-900/20', debit: 'bg-red-50 text-red-500 dark:bg-red-900/20', reminder: 'bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20', reward: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20', security: 'bg-blue-50 text-blue-500 dark:bg-blue-900/20', offer: 'bg-orange-50 text-orange-500 dark:bg-orange-900/20', info: 'bg-gray-50 text-gray-500 dark:bg-gray-800' };

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter((n) => !n.read) : notifications.filter((n) => n.read);

  const markAsRead = (id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const deleteNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Notifications</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="btn-ghost text-sm flex items-center gap-1"><CheckCheck size={16} /> Mark all read</button>
        )}
      </div>

      <div className="flex gap-2">
        {['all', 'unread', 'read'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((notif) => {
            const Icon = typeIcons[notif.type] || Bell;
            return (
              <motion.div key={notif.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }} className={`card-banking flex items-start gap-3 ${!notif.read ? 'border-l-4 border-primary-500' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${typeColors[notif.type]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${notif.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>{notif.title}</p>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{notif.message}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!notif.read && (
                    <button onClick={() => markAsRead(notif.id)} className="p-1.5 text-gray-400 hover:text-accent-500 transition-colors" title="Mark as read">
                      <Check size={14} />
                    </button>
                  )}
                  <button onClick={() => deleteNotification(notif.id)} className="p-1.5 text-gray-400 hover:text-secondary-500 transition-colors" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500">No notifications to show</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
