import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  height: 0,
  width: 0,
};

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    showKeyboard: (state, action) => {
      state.isVisible = true;
      state.height = action.payload.height;
      state.width = action.payload.width;
    },
    hideKeyboard: (state) => {
      state.isVisible = false;
      state.height = 0;
      state.width = 0;
    },
  },
});

export const { showKeyboard, hideKeyboard } = keyboardSlice.actions;

export default keyboardSlice.reducer;