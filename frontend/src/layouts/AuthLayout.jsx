import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl opacity-20" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-2 font-display">
                NeoBank
              </h1>
              <span className="text-2xl font-light text-white/80">Cloud</span>
            </div>
            
            <p className="text-xl text-white/90 mb-12 max-w-md">
              Your Digital Banking Partner. Secure, Fast, and Modern Banking Experience.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
              {[
                { icon: '🔒', title: 'Bank-Grade Security', desc: '256-bit encryption' },
                { icon: '⚡', title: 'Instant Transfers', desc: 'Real-time payments' },
                { icon: '📱', title: '24/7 Access', desc: 'Bank anywhere, anytime' },
                { icon: '💎', title: 'Premium Rewards', desc: 'Earn with every transaction' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left"
                >
                  <span className="text-2xl mb-2 block">{feature.icon}</span>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex items-center justify-center gap-4 text-white/60 text-sm"
            >
              <span>🇮🇳 Made in India</span>
              <span>•</span>
              <span>RBI Compliant</span>
              <span>•</span>
              <span>PCI DSS Certified</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white dark:bg-dark-800">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-gradient font-display">NeoBank</h1>
            <span className="text-lg text-gray-500">Cloud</span>
          </div>
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
