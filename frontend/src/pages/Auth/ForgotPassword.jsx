import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { forgotPassword, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {}
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <div className="w-16 h-16 bg-accent-50 dark:bg-accent-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Mail className="text-accent-500" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display mb-2">Check Your Email</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">We've sent a password reset link to <span className="font-medium">{email}</span></p>
        <Link to="/auth/login" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Login
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">Forgot Password?</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">No worries, we'll send you reset instructions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field pl-11" required />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="w-full btn-primary flex items-center justify-center gap-2 py-4">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Send size={20} /> Send Reset Link</>}
        </button>
      </form>

      <Link to="/auth/login" className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
        <ArrowLeft size={16} /> Back to Login
      </Link>
    </motion.div>
  );
};

export default ForgotPassword;
