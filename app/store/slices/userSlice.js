import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.id = null;
      state.name = '';
      state.email = '';
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.name = action.payload.name || state.name;
      state.email = action.payload.email || state.email;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser, 
  clearError 
} = userSlice.actions;

export default userSlice.reducer;