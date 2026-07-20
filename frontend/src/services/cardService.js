import api from './api';

export const cardService = {
  getCards: async () => {
    const response = await api.get('/cards');
    return response.data;
  },

  getCardById: async (id) => {
    const response = await api.get(`/cards/${id}`);
    return response.data;
  },

  getDebitCards: async () => {
    const response = await api.get('/cards/debit');
    return response.data;
  },

  getCreditCards: async () => {
    const response = await api.get('/cards/credit');
    return response.data;
  },

  blockCard: async (id) => {
    const response = await api.post(`/cards/${id}/block`);
    return response.data;
  },

  unblockCard: async (id) => {
    const response = await api.post(`/cards/${id}/unblock`);
    return response.data;
  },

  changePin: async (id, data) => {
    const response = await api.post(`/cards/${id}/change-pin`, data);
    return response.data;
  },

  setTransactionLimit: async (id, data) => {
    const response = await api.post(`/cards/${id}/transaction-limit`, data);
    return response.data;
  },

  getCardTransactions: async (id, params) => {
    const response = await api.get(`/cards/${id}/transactions`, { params });
    return response.data;
  },

  requestNewCard: async (data) => {
    const response = await api.post('/cards/request', data);
    return response.data;
  },

  getCardOffers: async (id) => {
    const response = await api.get(`/cards/${id}/offers`);
    return response.data;
  },

  addCard: async (data) => {
    const response = await api.post('/cards', data);
    return response.data;
  },

  removeCard: async (id) => {
    const response = await api.delete(`/cards/${id}`);
    return response.data;
  },
};
