import api from './api';

export const transactionService = {
  getTransactions: async (params) => {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  getTransactionById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  getRecentTransactions: async (limit = 5) => {
    const response = await api.get('/transactions/recent', { params: { limit } });
    return response.data;
  },

  getTransactionsByType: async (type, params) => {
    const response = await api.get(`/transactions/type/${type}`, { params });
    return response.data;
  },

  transferMoney: async (data) => {
    const response = await api.post('/transactions/transfer', data);
    return response.data;
  },

  upiTransfer: async (data) => {
    const response = await api.post('/transactions/upi', data);
    return response.data;
  },

  billPayment: async (data) => {
    const response = await api.post('/transactions/bill-payment', data);
    return response.data;
  },

  recharge: async (data) => {
    const response = await api.post('/transactions/recharge', data);
    return response.data;
  },

  getTransactionReceipt: async (id) => {
    const response = await api.get(`/transactions/${id}/receipt`, {
      responseType: 'blob',
    });
    return response.data;
  },

  getTransactionStats: async (params) => {
    const response = await api.get('/transactions/stats', { params });
    return response.data;
  },

  searchTransactions: async (query) => {
    const response = await api.get('/transactions/search', { params: { q: query } });
    return response.data;
  },
};
