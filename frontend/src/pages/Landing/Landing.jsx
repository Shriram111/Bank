import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Shield,
  Zap,
  Smartphone,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Check,
  Star,
  Users,
  Globe,
  Lock,
  Clock,
  ChevronRight,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-dark-800 dark:via-dark-900 dark:to-dark-800">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                India's Most Trusted Digital Bank
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-display leading-tight mb-6">
              Banking Made{' '}
              <span className="text-gradient">Simple, Secure</span>
              <br />& Swift
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
              Experience the future of banking with NeoBank Cloud. Instant transfers, smart savings, 
              and 24/7 access to your finances - all from your phone or laptop.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Open Account Now
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/auth/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-500 transition-all duration-300"
              >
                Login to Dashboard
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="text-accent-500" size={18} />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="text-accent-500" size={18} />
                <span>RBI Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-accent-500" size={18} />
                <span>10M+ Users</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-primary-500 text-white px-6 py-4 flex items-center justify-between">
                    <span className="text-sm font-medium">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 bg-white/80 rounded-sm" />
                      <div className="w-4 h-3 bg-white/80 rounded-sm" />
                      <div className="w-6 h-3 border border-white/80 rounded-sm" />
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-6 space-y-6">
                    {/* Balance Card */}
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
                      <p className="text-sm opacity-80">Total Balance</p>
                      <p className="text-3xl font-bold mt-1">₹2,45,680.00</p>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingUp size={16} />
                        <span className="text-sm">+12.5% this month</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { icon: '💸', label: 'Send' },
                        { icon: '📥', label: 'Receive' },
                        { icon: '💳', label: 'Pay' },
                        { icon: '📊', label: 'More' },
                      ].map((action, i) => (
                        <div key={i} className="text-center">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl mx-auto mb-1">
                            {action.icon}
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {action.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Recent Transactions */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Recent Activity
                      </h4>
                      {[
                        { name: 'Amazon', amount: '-₹2,499', type: 'debit' },
                        { name: 'Salary Credit', amount: '+₹85,000', type: 'credit' },
                        { name: 'Netflix', amount: '-₹649', type: 'debit' },
                      ].map((txn, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                              {txn.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {txn.name}
                              </p>
                              <p className="text-xs text-gray-500">Today</p>
                            </div>
                          </div>
                          <span
                            className={`font-semibold text-sm ${
                              txn.type === 'credit' ? 'text-accent-500' : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {txn.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-500/10 rounded-full flex items-center justify-center">
                    <Zap className="text-accent-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Transfer</p>
                    <p className="font-semibold text-gray-900 dark:text-white">Instant</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-500/10 rounded-full flex items-center justify-center">
                    <Shield className="text-secondary-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Security</p>
                    <p className="font-semibold text-gray-900 dark:text-white">Bank-Grade</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: Zap,
      title: 'Instant Transfers',
      description: 'Send money in seconds with IMPS, NEFT, RTGS, and UPI. No waiting, no delays.',
      color: 'primary',
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: '256-bit encryption, biometric login, and real-time fraud detection keep your money safe.',
      color: 'accent',
    },
    {
      icon: Smartphone,
      title: 'Digital-First',
      description: 'Full-featured mobile app and web dashboard. Bank anytime, anywhere.',
      color: 'secondary',
    },
    {
      icon: CreditCard,
      title: 'Smart Cards',
      description: 'Manage debit and credit cards with instant controls and real-time notifications.',
      color: 'primary',
    },
    {
      icon: TrendingUp,
      title: 'Invest & Grow',
      description: 'Fixed deposits, mutual funds, and insurance - all in one place.',
      color: 'accent',
    },
    {
      icon: Globe,
      title: '24/7 Access',
      description: 'Round-the-clock banking support and instant customer service.',
      color: 'secondary',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-display mb-4">
            Everything You Need for{' '}
            <span className="text-gradient">Modern Banking</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From daily transactions to long-term investments, NeoBank Cloud provides 
            a complete financial ecosystem at your fingertips.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              primary: 'bg-primary-50 dark:bg-primary-900/30 text-primary-500',
              secondary: 'bg-secondary-50 dark:bg-secondary-900/30 text-secondary-500',
              accent: 'bg-accent-50 dark:bg-accent-900/30 text-accent-500',
            };

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group p-6 bg-gray-50 dark:bg-dark-800 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
              >
                <div
                  className={`w-14 h-14 ${colorClasses[feature.color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { value: '10M+', label: 'Active Users' },
    { value: '₹50K Cr', label: 'Transactions Processed' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.8/5', label: 'App Store Rating' },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-display">
                {stat.value}
              </div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SecuritySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted with 256-bit SSL encryption',
    },
    {
      icon: Shield,
      title: 'Multi-Factor Authentication',
      description: 'OTP, biometric, and device-based authentication',
    },
    {
      icon: Clock,
      title: 'Session Management',
      description: 'Automatic logout and session timeout',
    },
    {
      icon: Zap,
      title: 'Fraud Detection',
      description: 'AI-powered real-time fraud monitoring',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full text-sm font-medium mb-4">
              Security
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-display mb-6">
              Your Security is Our{' '}
              <span className="text-gradient">Top Priority</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              We employ bank-grade security measures to protect your financial data. 
              Your money and information are always safe with NeoBank Cloud.
            </p>

            <div className="space-y-4">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-accent-50 dark:bg-accent-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-accent-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <Shield size={48} className="mb-6" />
                <h3 className="text-2xl font-bold mb-4">RBI Compliant</h3>
                <p className="text-white/80 mb-6">
                  NeoBank Cloud follows all RBI guidelines and regulations for digital banking in India.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'PCI DSS Certified',
                    'ISO 27001',
                    'SOC 2 Type II',
                    'GDPR Compliant',
                  ].map((cert, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check size={16} className="text-accent-400" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">
              Ready to Start Your Digital Banking Journey?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join millions of Indians who trust NeoBank Cloud for their daily banking needs. 
              Open your account in just 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Open Free Account
                <ArrowRight size={20} />
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Download App
                <Smartphone size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Landing = () => {
  return (
    <div className="page-transition">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <SecuritySection />
      <CTASection />
    </div>
  );
};

export default Landing;
