import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QrCode, Camera, Flashlight, X } from 'lucide-react';

const QRScanner = () => {
  return (
    <div className="page-transition space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Scan & Pay</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Scan any UPI QR code to pay</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-gray-900 rounded-3xl overflow-hidden relative">
          <div className="aspect-square flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white/30 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent-500 rounded-br-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-accent-500 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 text-center text-white/80">
              <Camera size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Point camera at QR code</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium">
            <Flashlight size={18} /> Flash
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 font-medium">
            <QrCode size={18} /> My QR
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 text-center mb-3">Or enter UPI ID manually</p>
          <div className="flex gap-2">
            <input type="text" placeholder="Enter UPI ID" className="input-field flex-1" />
            <button className="btn-primary px-6">Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
