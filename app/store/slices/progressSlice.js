import { createSlice } from '@reduxjs/toolkit';

// Initial state matching THAMC structure (simple boolean)
const initialState = false;

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    // Exactly matching THAMC INCREMENT_PROGRESS action
    incrementProgress: (state) => {
      return true;
    },
    // Exactly matching THAMC DECREMENT_PROGRESS action
    decrementProgress: (state) => {
      return false;
    },
  },
});

export const {
  incrementProgress,
  decrementProgress,
} = progressSlice.actions;

export default progressSlice.reducer;