import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Activity, AlertTriangle, ArrowUpRight, ArrowDownLeft, DollarSign, Clock, Server, Database, Wifi, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const txData = [
  { day: 'Mon', volume: 12400 }, { day: 'Tue', volume: 15600 }, { day: 'Wed', volume: 14200 },
  { day: 'Thu', volume: 18900 }, { day: 'Fri', volume: 21300 }, { day: 'Sat', volume: 16700 }, { day: 'Sun', volume: 11200 },
];

const recentActivity = [
  { id: 1, action: 'New user registered', user: 'Priya M.', time: '5 min ago', type: 'user' },
  { id: 2, action: 'Large transaction flagged', user: 'Rahul K.', time: '12 min ago', type: 'alert' },
  { id: 3, action: 'KYC document approved', user: 'Sneha P.', time: '25 min ago', type: 'success' },
  { id: 4, action: 'Card blocked by user', user: 'Amit R.', time: '1 hour ago', type: 'warning' },
  { id: 5, action: 'System backup completed', user: 'System', time: '2 hours ago', type: 'system' },
];

const systemHealth = [
  { name: 'API Server', status: 'healthy', uptime: '99.98%', latency: '45ms' },
  { name: 'Database', status: 'healthy', uptime: '99.99%', latency: '12ms' },
  { name: 'Payment Gateway', status: 'warning', uptime: '99.95%', latency: '120ms' },
  { name: 'CDN', status: 'healthy', uptime: '100%', latency: '8ms' },
];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { label: 'Total Users', value: '1,24,589', change: '+2.4%', up: true, icon: Users, color: 'bg-primary-50 text-primary-500 dark:bg-primary-900/20' },
    { label: 'Transactions Today', value: '₹48.5L', change: '+12.8%', up: true, icon: TrendingUp, color: 'bg-accent-50 text-accent-500 dark:bg-accent-900/20' },
    { label: 'Active Users', value: '8,432', change: '-1.2%', up: false, icon: Activity, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
    { label: 'Pending Alerts', value: '23', change: '+5', up: false, icon: AlertTriangle, color: 'bg-secondary-50 text-secondary-500 dark:bg-secondary-900/20' },
  ];

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">System overview and monitoring</p>
        </div>
        <div className="flex gap-2">
          {['24h', '7d', '30d'].map((range) => (
            <button key={range} onClick={() => setTimeRange(range)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${timeRange === range ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>{range}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="card-banking">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}><Icon size={20} /></div>
                <span className={`text-xs font-medium flex items-center gap-1 ${stat.up ? 'text-accent-500' : 'text-secondary-500'}`}>
                  {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownLeft size={12} />} {stat.change}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transaction Volume Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 card-banking">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction Volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={txData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px' }} formatter={(v) => [v.toLocaleString(), 'Transactions']} />
                <Line type="monotone" dataKey="volume" stroke="#004C8C" strokeWidth={2} dot={{ fill: '#004C8C', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card-banking">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Health</h3>
          <div className="space-y-3">
            {systemHealth.map((sys, i) => (
              <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{sys.name}</p>
                  {sys.status === 'healthy' ? <CheckCircle size={14} className="text-accent-500" /> : <AlertTriangle size={14} className="text-yellow-500" />}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Uptime: {sys.uptime}</span>
                  <span>Latency: {sys.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-banking">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {recentActivity.map((item) => {
            const typeColors = { user: 'bg-blue-50 text-blue-500 dark:bg-blue-900/20', alert: 'bg-red-50 text-red-500 dark:bg-red-900/20', success: 'bg-green-50 text-green-500 dark:bg-green-900/20', warning: 'bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20', system: 'bg-gray-100 text-gray-500 dark:bg-gray-800' };
            return (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${typeColors[item.type]}`}>
                    {item.type === 'user' && <Users size={14} />}
                    {item.type === 'alert' && <AlertTriangle size={14} />}
                    {item.type === 'success' && <CheckCircle size={14} />}
                    {item.type === 'warning' && <XCircle size={14} />}
                    {item.type === 'system' && <Server size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
