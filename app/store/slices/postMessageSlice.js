import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state based on your THAMC postmessage reducer
const initialState = {
  onEnterScreen: {},
  loading: false,
  error: null,
};

// Async thunk for setting post message on enter screen
export const setPostMessageOnEnterScreen = createAsyncThunk(
  'postMessage/setOnEnterScreen',
  async ({ screen, action }, { rejectWithValue }) => {
    try {
      const payload = {
        screen: screen,
        data: { action: action }
      };

      return payload;
    } catch (error) {
      console.log("err:", error);
      return rejectWithValue({
        message: error?.message || 'Failed to set post message',
        code: error?.code || 'SET_POSTMESSAGE_ERROR',
      });
    }
  }
);

// Async thunk for removing post message on enter screen
export const removePostMessageOnEnterScreen = createAsyncThunk(
  'postMessage/removeOnEnterScreen',
  async (screen, { rejectWithValue }) => {
    try {
      return { screen };
    } catch (error) {
      return rejectWithValue({
        message: error?.message || 'Failed to remove post message',
        code: error?.code || 'REMOVE_POSTMESSAGE_ERROR',
      });
    }
  }
);

export const postMessageSlice = createSlice({
  name: 'postMessage',
  initialState,
  reducers: {
    // Synchronous reducers for immediate updates
    setOnEnterScreenSync: (state, action) => {
      const { screen, data } = action.payload;
      state.onEnterScreen[screen] = data.action;
    },
    removeOnEnterScreenSync: (state, action) => {
      const { screen } = action.payload;
      delete state.onEnterScreen[screen];
    },
    clearAllPostMessages: (state) => {
      state.onEnterScreen = {};
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Set post message on enter screen
      .addCase(setPostMessageOnEnterScreen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPostMessageOnEnterScreen.fulfilled, (state, action) => {
        const { screen, data } = action.payload;
        state.onEnterScreen[screen] = data.action;
        state.loading = false;
        state.error = null;
      })
      .addCase(setPostMessageOnEnterScreen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove post message on enter screen
      .addCase(removePostMessageOnEnterScreen.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePostMessageOnEnterScreen.fulfilled, (state, action) => {
        const { screen } = action.payload;
        delete state.onEnterScreen[screen];
        state.loading = false;
        state.error = null;
      })
      .addCase(removePostMessageOnEnterScreen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setOnEnterScreenSync,
  removeOnEnterScreenSync,
  clearAllPostMessages,
  clearError,
} = postMessageSlice.actions;

export default postMessageSlice.reducer;