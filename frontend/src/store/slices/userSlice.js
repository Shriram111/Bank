import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  preferences: {
    language: 'en',
    currency: 'INR',
    notifications: {
      email: true,
      sms: true,
      push: true,
    },
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.preferences = initialState.preferences;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setPreferences,
  setLoading,
  setError,
  clearProfile,
} = userSlice.actions;

export default userSlice.reducer;
