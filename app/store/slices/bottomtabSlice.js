import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  focusedTab: 0,
  prevFocusedTab: 0,
  isHide: false,
};

export const bottomTabSlice = createSlice({
  name: 'bottomTab',
  initialState,
  reducers: {
    setFocusedTab: (state, action) => {
      state.prevFocusedTab = state.focusedTab;
      state.focusedTab = action.payload;
    },
    hideBottomTab: (state) => {
      state.isHide = true;
    },
    showBottomTab: (state) => {
      state.isHide = false;
    },
    toggleBottomTab: (state) => {
      state.isHide = !state.isHide;
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
  setFocusedTab, 
  hideBottomTab, 
  showBottomTab, 
  toggleBottomTab 
} = bottomTabSlice.actions;

export default bottomTabSlice.reducer;
