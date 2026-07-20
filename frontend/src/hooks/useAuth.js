import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  clearError,
} from '../store/slices/authSlice';
import { authService } from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const login = useCallback(
    async (credentials) => {
      dispatch(loginStart());
      try {
        const response = await authService.login(credentials);
        dispatch(loginSuccess(response.data));
        toast.success('Login successful!');
        navigate('/dashboard');
        return response;
      } catch (err) {
        const message = err.response?.data?.message || 'Login failed';
        dispatch(loginFailure(message));
        toast.error(message);
        throw err;
      }
    },
    [dispatch, navigate]
  );

  const register = useCallback(
    async (userData) => {
      dispatch(loginStart());
      try {
        const response = await authService.register(userData);
        toast.success('Registration successful! Please verify your email.');
        navigate('/auth/otp', { state: { email: userData.email } });
        return response;
      } catch (err) {
        const message = err.response?.data?.message || 'Registration failed';
        dispatch(loginFailure(message));
        toast.error(message);
        throw err;
      }
    },
    [dispatch, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      // Ignore logout API errors
    } finally {
      dispatch(logoutAction());
      navigate('/auth/login');
      toast.success('Logged out successfully');
    }
  }, [dispatch, navigate]);

  const forgotPassword = useCallback(async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      toast.success('Password reset link sent to your email');
      return response;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send reset link';
      toast.error(message);
      throw err;
    }
  }, []);

  const resetPassword = useCallback(async (data) => {
    try {
      const response = await authService.resetPassword(data);
      toast.success('Password reset successful');
      navigate('/auth/login');
      return response;
    } catch (err) {
      const message = err.response?.data?.message || 'Password reset failed';
      toast.error(message);
      throw err;
    }
  }, [navigate]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    clearAuthError,
  };
};
