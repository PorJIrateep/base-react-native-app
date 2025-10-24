import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import userSlice from './slices/userSlice';
import bottomTabSlice from './slices/bottomtabSlice';
import routenameSlice from './slices/routenameSlice';
import notificationSlice from './slices/notificationSlice';
import keyboardSlice from './slices/keyboardSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    bottomTab: bottomTabSlice,
    routename: routenameSlice,
    notification: notificationSlice,
    keyboard: keyboardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});