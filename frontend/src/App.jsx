import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { useAuth } from './hooks/useAuth';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Loader from './components/common/Loader/Loader';
import ProtectedRoute from './guards/ProtectedRoute';
import PublicRoute from './guards/PublicRoute';

const Landing = lazy(() => import('./pages/Landing/Landing'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const OTPVerification = lazy(() => import('./pages/Auth/OTPVerification'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const AccountOverview = lazy(() => import('./pages/Accounts/AccountOverview'));
const SavingsAccount = lazy(() => import('./pages/Accounts/SavingsAccount'));
const CurrentAccount = lazy(() => import('./pages/Accounts/CurrentAccount'));
const TransactionHistory = lazy(() => import('./pages/Transactions/TransactionHistory'));
const MoneyTransfer = lazy(() => import('./pages/Payments/MoneyTransfer'));
const UPIPayment = lazy(() => import('./pages/UPI/UPIPayment'));
const QRScanner = lazy(() => import('./pages/UPI/QRScanner'));
const BillPayment = lazy(() => import('./pages/Payments/BillPayment'));
const Recharge = lazy(() => import('./pages/Payments/Recharge'));
const DebitCard = lazy(() => import('./pages/Cards/DebitCard'));
const CreditCard = lazy(() => import('./pages/Cards/CreditCard'));
const LoanDashboard = lazy(() => import('./pages/Loans/LoanDashboard'));
const EMICalculator = lazy(() => import('./pages/Loans/EMICalculator'));
const FixedDeposit = lazy(() => import('./pages/Investments/FixedDeposit'));
const InvestmentDashboard = lazy(() => import('./pages/Investments/InvestmentDashboard'));
const Insurance = lazy(() => import('./pages/Insurance/Insurance'));
const Rewards = lazy(() => import('./pages/Rewards/Rewards'));
const Offers = lazy(() => import('./pages/Offers/Offers'));
const Notifications = lazy(() => import('./pages/Notifications/Notifications'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Support = lazy(() => import('./pages/Support/Support'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Landing />} />
          </Route>

          <Route path="/auth" element={<PublicRoute><AuthLayout /></PublicRoute>}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="otp" element={<OTPVerification />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<AccountOverview />} />
            <Route path="accounts/savings" element={<SavingsAccount />} />
            <Route path="accounts/current" element={<CurrentAccount />} />
            <Route path="transactions" element={<TransactionHistory />} />
            <Route path="transfer" element={<MoneyTransfer />} />
            <Route path="upi" element={<UPIPayment />} />
            <Route path="upi/scan" element={<QRScanner />} />
            <Route path="bills" element={<BillPayment />} />
            <Route path="recharge" element={<Recharge />} />
            <Route path="cards" element={<DebitCard />} />
            <Route path="cards/credit" element={<CreditCard />} />
            <Route path="loans" element={<LoanDashboard />} />
            <Route path="loans/emi-calculator" element={<EMICalculator />} />
            <Route path="investments" element={<InvestmentDashboard />} />
            <Route path="investments/fd" element={<FixedDeposit />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="offers" element={<Offers />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoute adminOnly><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
