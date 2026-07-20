import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Globe, Bell, Lock, Smartphone, Shield, ChevronRight, Link2, Trash2, Eye, EyeOff, Fingerprint, Key } from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({ push: true, email: false, sms: true, transactions: true, promotions: false });
  const [showPin, setShowPin] = useState(false);

  const toggleNotification = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const linkedAccounts = [
    { name: 'Google Pay', id: 'gpay@okaxis', connected: true },
    { name: 'PhonePe', id: '9876543210@ybl', connected: true },
    { name: 'Paytm', id: '9876543210@paytm', connected: false },
  ];

  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Customize your app experience</p>
      </div>

      {/* Theme */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-banking">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><Sun size={16} /> Appearance</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Smartphone },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTheme(id)} className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${theme === id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'}`}>
              <Icon size={20} className={theme === id ? 'text-primary-500' : 'text-gray-400'} />
              <span className={`text-sm font-medium ${theme === id ? 'text-primary-500' : 'text-gray-600 dark:text-gray-400'}`}>{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Language */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card-banking">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><Globe size={16} /> Language</h3>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input-field">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="mr">Marathi</option>
        </select>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-banking">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Bell size={16} /> Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { key: 'push', label: 'Push Notifications', desc: 'Receive alerts on your device' },
            { key: 'email', label: 'Email Notifications', desc: 'Get updates via email' },
            { key: 'sms', label: 'SMS Alerts', desc: 'Important alerts via SMS' },
            { key: 'transactions', label: 'Transaction Alerts', desc: 'Real-time transaction updates' },
            { key: 'promotions', label: 'Promotions', desc: 'Offers and cashback deals' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <button onClick={() => toggleNotification(key)} className={`w-12 h-6 rounded-full transition-colors relative ${notifications[key] ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-all ${notifications[key] ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card-banking">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Lock size={16} /> Security</h3>
        <div className="space-y-3">
          {[
            { icon: Key, label: 'Change PIN', desc: 'Update your 4-digit PIN' },
            { icon: Fingerprint, label: 'Biometric Login', desc: 'Use fingerprint or face ID', toggle: true },
            { icon: Shield, label: 'Two-Factor Auth', desc: 'Add extra layer of security', toggle: true, enabled: true },
            { icon: Eye, label: 'Login History', desc: 'View recent login activity' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-500"><Icon size={16} /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
                {item.toggle ? (
                  <button className={`w-12 h-6 rounded-full transition-colors relative ${item.enabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 transition-all ${item.enabled ? 'left-6' : 'left-0.5'}`} />
                  </button>
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Linked Accounts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-banking">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Link2 size={16} /> Linked UPI Accounts</h3>
        <div className="space-y-2">
          {linkedAccounts.map((acc, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{acc.name}</p>
                <p className="text-xs text-gray-500 font-mono">{acc.id}</p>
              </div>
              {acc.connected ? (
                <button className="text-xs text-secondary-500 hover:text-secondary-600 flex items-center gap-1"><Trash2 size={12} /> Disconnect</button>
              ) : (
                <button className="text-xs text-primary-500 hover:text-primary-600 font-medium">Connect</button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
