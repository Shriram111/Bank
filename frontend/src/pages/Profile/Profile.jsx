import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { User, Mail, Phone, MapPin, Shield, FileText, Camera, Edit3, CheckCircle, Upload, Calendar, CreditCard } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'User',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: '1992-05-15',
    address: '12 MG Road, Sector 62, Noida, UP - 201301',
    pan: 'ABCDE1234F',
    aadhaar: '****-****-7890',
  });

  const kycStatus = { aadhaar: 'verified', pan: 'verified', bank: 'verified', address: 'pending' };

  const handleChange = (field, value) => setProfile((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="page-transition space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your personal information</p>
        </div>
        <button onClick={() => setIsEditing(!isEditing)} className={`text-sm flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${isEditing ? 'btn-primary' : 'btn-outline'}`}>
          <Edit3 size={16} /> {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Avatar Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-banking flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold font-display">
            {profile.name.charAt(0)}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-600 transition-colors">
            <Camera size={14} />
          </button>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
          <p className="text-gray-500 text-sm">{profile.email}</p>
          <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
              <CheckCircle size={12} /> KYC Verified
            </span>
            <span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-500 rounded-full text-xs font-medium">Premium Member</span>
          </div>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-banking">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', field: 'name', icon: User },
            { label: 'Email', field: 'email', icon: Mail },
            { label: 'Phone', field: 'phone', icon: Phone },
            { label: 'Date of Birth', field: 'dob', icon: Calendar, type: 'date' },
          ].map(({ label, field, icon: Icon, type }) => (
            <div key={field}>
              <label className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Icon size={14} /> {label}</label>
              {isEditing ? (
                <input type={type || 'text'} value={profile[field]} onChange={(e) => handleChange(field, e.target.value)} className="input-field" />
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">{field === 'dob' ? new Date(profile[field]).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : profile[field]}</p>
              )}
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500 mb-1 flex items-center gap-1"><MapPin size={14} /> Address</label>
            {isEditing ? (
              <textarea value={profile.address} onChange={(e) => handleChange('address', e.target.value)} className="input-field" rows={2} />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profile.address}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* KYC Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-banking">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">KYC & Documents</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { label: 'Aadhaar Card', status: kycStatus.aadhaar, number: profile.aadhaar, icon: CreditCard },
            { label: 'PAN Card', status: kycStatus.pan, number: profile.pan, icon: FileText },
            { label: 'Bank Account', status: kycStatus.bank, number: '••••4589', icon: CreditCard },
            { label: 'Address Proof', status: kycStatus.address, number: 'Upload required', icon: MapPin },
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-500"><doc.icon size={16} /></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.label}</p>
                  <p className="text-xs text-gray-500">{doc.number}</p>
                </div>
              </div>
              {doc.status === 'verified' ? (
                <span className="flex items-center gap-1 text-xs text-accent-500 font-medium"><CheckCircle size={14} /> Verified</span>
              ) : (
                <button className="text-xs text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1"><Upload size={12} /> Upload</button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
