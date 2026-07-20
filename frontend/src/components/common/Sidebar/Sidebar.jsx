import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Shield,
  Gift,
  Tag,
  Bell,
  User,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Smartphone,
  Receipt,
  Receipt,
  QrCode,
  Calculator,
  FileText,
} from 'lucide-react';
import { toggleSidebarCollapse, setSidebarOpen } from '../../../store/slices/uiSlice';

const menuItems = [
  {
    title: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Wallet, label: 'Accounts', path: '/dashboard/accounts' },
      { icon: ArrowLeftRight, label: 'Transactions', path: '/dashboard/transactions' },
    ],
  },
  {
    title: 'Payments',
    items: [
      { icon: Landmark, label: 'Money Transfer', path: '/dashboard/transfer' },
      { icon: QrCode, label: 'UPI Payment', path: '/dashboard/upi' },
      { icon: Receipt, label: 'Bill Payment', path: '/dashboard/bills' },
      { icon: Smartphone, label: 'Recharge', path: '/dashboard/recharge' },
    ],
  },
  {
    title: 'Cards & Loans',
    items: [
      { icon: CreditCard, label: 'Cards', path: '/dashboard/cards' },
      { icon: FileText, label: 'Loans', path: '/dashboard/loans' },
      { icon: Calculator, label: 'EMI Calculator', path: '/dashboard/loans/emi-calculator' },
    ],
  },
  {
    title: 'Investments',
    items: [
      { icon: PiggyBank, label: 'Fixed Deposit', path: '/dashboard/investments/fd' },
      { icon: TrendingUp, label: 'Investments', path: '/dashboard/investments' },
      { icon: Shield, label: 'Insurance', path: '/dashboard/insurance' },
    ],
  },
  {
    title: 'Rewards',
    items: [
      { icon: Gift, label: 'Rewards', path: '/dashboard/rewards' },
      { icon: Tag, label: 'Offers', path: '/dashboard/offers' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
      { icon: User, label: 'Profile', path: '/dashboard/profile' },
      { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
      { icon: HelpCircle, label: 'Support', path: '/dashboard/support' },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarOpen, sidebarCollapsed, isMobile } = useSelector(
    (state) => state.ui
  );

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  if (!sidebarOpen && !isMobile) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? { x: -280 } : false}
        animate={{ x: 0 }}
        exit={isMobile ? { x: -280 } : undefined}
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-40 bg-white dark:bg-dark-800 border-r border-gray-100 dark:border-gray-800 overflow-y-auto scrollbar-thin transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${isMobile ? 'shadow-xl' : ''}`}
      >
        <div className="p-4">
          {/* Collapse Button - Desktop Only */}
          {!isMobile && (
            <button
              onClick={() => dispatch(toggleSidebarCollapse())}
              className="hidden lg:flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-4"
            >
              {sidebarCollapsed ? (
                <ChevronRight size={20} className="text-gray-500" />
              ) : (
                <ChevronLeft size={20} className="text-gray-500" />
              )}
            </button>
          )}

          {/* Menu Items */}
          <nav className="space-y-6">
            {menuItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {!sidebarCollapsed && (
                  <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          if (isMobile) {
                            dispatch(setSidebarOpen(false));
                          }
                        }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                          active
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        title={sidebarCollapsed ? item.label : undefined}
                      >
                        <Icon
                          size={20}
                          className={active ? 'text-primary-500' : ''}
                        />
                        {!sidebarCollapsed && (
                          <span className="text-sm">{item.label}</span>
                        )}
                        {active && !sidebarCollapsed && (
                          <motion.div
                            layoutId="activeTab"
                            className="ml-auto w-1.5 h-1.5 bg-primary-500 rounded-full"
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          {!sidebarCollapsed && (
            <div className="mt-8 p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
              <h4 className="text-white font-semibold mb-2">Quick Transfer</h4>
              <p className="text-white/80 text-sm mb-3">
                Send money instantly to anyone
              </p>
              <Link
                to="/dashboard/transfer"
                className="block w-full py-2 bg-white text-primary-600 text-center rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Send Money
              </Link>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
