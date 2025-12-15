import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import bottomTabSlice from './slices/bottomtabSlice';
import routenameSlice from './slices/routenameSlice';
import notificationSlice from './slices/notificationSlice';
import keyboardSlice from './slices/keyboardSlice';
import progressSlice from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    // Existing slices
    counter: counterSlice,
    bottomTab: bottomTabSlice,
    routename: routenameSlice,
    notification: notificationSlice,
    keyboard: keyboardSlice,
    progress: progressSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          
        ],
      },
    }),
});