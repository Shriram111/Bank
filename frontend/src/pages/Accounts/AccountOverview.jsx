import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, ChevronRight, Copy, Plus } from 'lucide-react';

const accounts = [
  { id: 1, type: 'Savings Account', bank: 'NeoBank Cloud', number: '••••4589', balance: 185420, color: 'from-primary-500 to-primary-600' },
  { id: 2, type: 'Current Account', bank: 'NeoBank Cloud Business', number: '••••7823', balance: 60260, color: 'from-accent-500 to-accent-600' },
];

const AccountOverview = () => {
  const [showBalance, setShowBalance] = React.useState(true);
  const totalBalance = accounts.reduce((acc, a) => acc + a.balance, 0);

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">My Accounts</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage all your bank accounts</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Open New Account
        </button>
      </div>

      {/* Total Balance */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80">Total Balance</span>
          <button onClick={() => setShowBalance(!showBalance)} className="p-1 bg-white/10 rounded-lg hover:bg-white/20">
            {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        <p className="text-3xl font-bold font-display">{showBalance ? `₹${totalBalance.toLocaleString()}` : '••••••••'}</p>
      </div>

      {/* Account Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <motion.div key={account.id} whileHover={{ y: -4 }} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${account.color} rounded-xl flex items-center justify-center text-white`}>
                  <Wallet size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{account.type}</p>
                  <p className="text-sm text-gray-500">{account.bank}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 mb-1">Account Number</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-gray-900 dark:text-white">{account.number}</p>
                <button className="text-gray-400 hover:text-gray-600"><Copy size={14} /></button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Available Balance</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">₹{account.balance.toLocaleString()}</p>
              </div>
              <Link to={`/dashboard/accounts/${account.type.toLowerCase().replace(' ', '-')}`} className="text-primary-500 hover:text-primary-600 flex items-center gap-1 text-sm font-medium">
                View Details <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: ArrowUpRight, label: 'Send Money', path: '/dashboard/transfer' },
            { icon: ArrowDownLeft, label: 'Request Money', path: '/dashboard/transfer' },
            { icon: Plus, label: 'Add Account', path: '/dashboard/accounts' },
            { icon: ChevronRight, label: 'Statements', path: '/dashboard/transactions' },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} to={action.path} className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                <Icon size={24} className="text-primary-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
