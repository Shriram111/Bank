import api from './api';

export const paymentService = {
  getPaymentMethods: async () => {
    const response = await api.get('/payments/methods');
    return response.data;
  },

  createPayment: async (data) => {
    const response = await api.post('/payments', data);
    return response.data;
  },

  getPaymentById: async (id) => {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },

  getPaymentHistory: async (params) => {
    const response = await api.get('/payments/history', { params });
    return response.data;
  },

  getBillers: async (category) => {
    const response = await api.get('/payments/billers', { params: { category } });
    return response.data;
  },

  payBill: async (data) => {
    const response = await api.post('/payments/bill', data);
    return response.data;
  },

  getRechargeProviders: async (type) => {
    const response = await api.get('/payments/recharge/providers', { params: { type } });
    return response.data;
  },

  doRecharge: async (data) => {
    const response = await api.post('/payments/recharge', data);
    return response.data;
  },

  getPaymentStatus: async (id) => {
    const response = await api.get(`/payments/${id}/status`);
    return response.data;
  },

  cancelPayment: async (id) => {
    const response = await api.post(`/payments/${id}/cancel`);
    return response.data;
  },
};
