import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  recentTransactions: [],
  isLoading: false,
  error: null,
  filters: {
    type: 'all',
    dateRange: { start: null, end: null },
    minAmount: null,
    maxAmount: null,
    status: 'all',
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: true,
  },
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.isLoading = false;
    },
    setRecentTransactions: (state, action) => {
      state.recentTransactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
      state.recentTransactions.unshift(action.payload);
      if (state.recentTransactions.length > 5) {
        state.recentTransactions.pop();
      }
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setTransactions,
  setRecentTransactions,
  addTransaction,
  updateTransaction,
  setFilters,
  setPagination,
  setLoading,
  setError,
  clearFilters,
} = transactionSlice.actions;

export default transactionSlice.reducer;
