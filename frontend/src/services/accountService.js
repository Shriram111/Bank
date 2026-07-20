import api from './api';

export const accountService = {
  getAccounts: async () => {
    const response = await api.get('/accounts');
    return response.data;
  },

  getAccountById: async (id) => {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  },

  getSavingsAccounts: async () => {
    const response = await api.get('/accounts/savings');
    return response.data;
  },

  getCurrentAccounts: async () => {
    const response = await api.get('/accounts/current');
    return response.data;
  },

  getAccountBalance: async (id) => {
    const response = await api.get(`/accounts/${id}/balance`);
    return response.data;
  },

  getAccountStatement: async (id, params) => {
    const response = await api.get(`/accounts/${id}/statement`, { params });
    return response.data;
  },

  getAccountSummary: async () => {
    const response = await api.get('/accounts/summary');
    return response.data;
  },

  linkAccount: async (data) => {
    const response = await api.post('/accounts/link', data);
    return response.data;
  },

  getBeneficiaries: async () => {
    const response = await api.get('/accounts/beneficiaries');
    return response.data;
  },

  addBeneficiary: async (data) => {
    const response = await api.post('/accounts/beneficiaries', data);
    return response.data;
  },

  removeBeneficiary: async (id) => {
    const response = await api.delete(`/accounts/beneficiaries/${id}`);
    return response.data;
  },
};
