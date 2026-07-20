import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accounts: [],
  selectedAccount: null,
  totalBalance: 0,
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
      state.totalBalance = action.payload.reduce(
        (acc, account) => acc + (account.balance || 0),
        0
      );
      state.isLoading = false;
    },
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    updateAccountBalance: (state, action) => {
      const { accountId, balance } = action.payload;
      const account = state.accounts.find((acc) => acc.id === accountId);
      if (account) {
        account.balance = balance;
      }
      state.totalBalance = state.accounts.reduce(
        (acc, accItem) => acc + (accItem.balance || 0),
        0
      );
    },
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
      state.totalBalance += action.payload.balance || 0;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setAccounts,
  setSelectedAccount,
  updateAccountBalance,
  addAccount,
  setLoading,
  setError,
} = accountSlice.actions;

export default accountSlice.reducer;
