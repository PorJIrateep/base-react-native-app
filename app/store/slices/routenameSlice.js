import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  previousRouteName: null,
  currentRouteName: null,
};

export const routenameSlice = createSlice({
  name: 'routename',
  initialState,
  reducers: {
    setRouteName: (state, action) => {
      state.previousRouteName = action.payload.previousRouteName;
      state.currentRouteName = action.payload.currentRouteName;
    },
  },
});

export const { setRouteName } = routenameSlice.actions;

export default routenameSlice.reducer;