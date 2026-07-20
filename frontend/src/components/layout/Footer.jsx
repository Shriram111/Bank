import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageSquare,
  Camera,
  Link2,
  Play,
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Products: [
      { label: 'Savings Account', path: '/accounts/savings' },
      { label: 'Current Account', path: '/accounts/current' },
      { label: 'Fixed Deposits', path: '/investments/fd' },
      { label: 'Credit Cards', path: '/cards/credit' },
      { label: 'Personal Loans', path: '/loans' },
      { label: 'Insurance', path: '/insurance' },
    ],
    Services: [
      { label: 'UPI Payments', path: '/upi' },
      { label: 'Bill Payments', path: '/bills' },
      { label: 'Mobile Recharge', path: '/recharge' },
      { label: 'Money Transfer', path: '/transfer' },
      { label: 'QR Payments', path: '/upi/scan' },
      { label: 'Investments', path: '/investments' },
    ],
    Company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
      { label: 'Blog', path: '/blog' },
      { label: 'Partners', path: '/partners' },
      { label: 'Contact', path: '/contact' },
    ],
    Support: [
      { label: 'Help Center', path: '/support' },
      { label: 'FAQs', path: '/faqs' },
      { label: 'Report Fraud', path: '/report-fraud' },
      { label: 'Grievance', path: '/grievance' },
      { label: 'Feedback', path: '/feedback' },
      { label: 'API Docs', path: '/api-docs' },
    ],
    Legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Disclaimer', path: '/disclaimer' },
      { label: 'IT Act', path: '/it-act' },
      { label: 'RBI Guidelines', path: '/rbi-guidelines' },
    ],
  };

  const socialLinks = [
    { icon: Globe, href: '#', label: 'Facebook' },
    { icon: MessageSquare, href: '#', label: 'Twitter' },
    { icon: Camera, href: '#', label: 'Instagram' },
    { icon: Link2, href: '#', label: 'LinkedIn' },
    { icon: Play, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-dark-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white font-display">NeoBank</span>
                <span className="text-sm text-gray-400 block">Cloud</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Your trusted digital banking partner. Experience secure, fast, and modern banking at your fingertips.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a
                href="tel:1800-123-4567"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={16} />
                <span>1800-123-4567 (Toll Free)</span>
              </a>
              <a
                href="mailto:support@neobank.cloud"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={16} />
                <span>support@neobank.cloud</span>
              </a>
              <span className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>Mumbai, India</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
              <span>© {new Date().getFullYear()} NeoBank Cloud. All rights reserved.</span>
              <span>•</span>
              <span>RBI Registered</span>
              <span>•</span>
              <span>PCI DSS Compliant</span>
              <span>•</span>
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/images/rbi-logo.png"
                alt="RBI"
                className="h-8 opacity-50 grayscale"
              />
              <img
                src="/images/pci-logo.png"
                alt="PCI DSS"
                className="h-8 opacity-50 grayscale"
              />
              <img
                src="/images/iso-logo.png"
                alt="ISO"
                className="h-8 opacity-50 grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
