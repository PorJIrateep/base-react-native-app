import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  badge: 0,
  pending: true,
  items: [],
  isError: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchNotificationStart: (state) => {
      state.pending = true;
      state.isError = false;
      state.error = null;
    },
    fetchNotificationSuccess: (state, action) => {
      state.pending = false;
      state.items = action.payload;
      state.isError = false;
      state.error = null;
    },
    fetchNotificationFailure: (state, action) => {
      state.pending = false;
      state.isError = true;
      state.error = action.payload;
      state.items = [];
    },
    setBadge: (state, action) => {
      state.badge = action.payload;
    },
    clearBadge: (state) => {
      state.badge = 0;
    },
  },
});

export const { 
  fetchNotificationStart,
  fetchNotificationSuccess, 
  fetchNotificationFailure, 
  setBadge, 
  clearBadge 
} = notificationSlice.actions;

export default notificationSlice.reducer;