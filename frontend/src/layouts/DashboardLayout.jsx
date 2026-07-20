import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/common/Navbar/Navbar';
import Sidebar from '../components/common/Sidebar/Sidebar';
import { setSidebarOpen, setIsMobile } from '../store/slices/uiSlice';
import { useSocket } from '../context/SocketContext';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, isMobile } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const { isConnected } = useSocket();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      dispatch(setIsMobile(mobile));
      if (mobile) {
        dispatch(setSidebarOpen(false));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-800">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen && !isMobile ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="p-4 md:p-6 lg:p-8">
            {/* Connection Status */}
            <AnimatePresence>
              {!isConnected && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  <span className="text-sm text-yellow-700 dark:text-yellow-400">
                    Reconnecting to server...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-30"
                onClick={() => dispatch(setSidebarOpen(false))}
              />
            )}

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
