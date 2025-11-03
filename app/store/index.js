import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import userSlice from './slices/userSlice';
import bottomTabSlice from './slices/bottomtabSlice';
import routenameSlice from './slices/routenameSlice';
import notificationSlice from './slices/notificationSlice';
import keyboardSlice from './slices/keyboardSlice';
// New slices from THAMC project
import installationSlice from './slices/installationSlice';
import postMessageSlice from './slices/postMessageSlice';
import progressSlice from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    // Existing slices
    counter: counterSlice,
    user: userSlice,
    bottomTab: bottomTabSlice,
    routename: routenameSlice,
    notification: notificationSlice,
    keyboard: keyboardSlice,
    installation: installationSlice,
    postMessage: postMessageSlice,
    progress: progressSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'user/loginBySession/pending',
          'user/loginBySession/fulfilled',
          'user/loginBySession/rejected',
          'user/logUserIn/pending',
          'user/logUserIn/fulfilled',
          'user/logUserIn/rejected',
          'user/checkSession/pending',
          'user/checkSession/fulfilled',
          'user/checkSession/rejected',
          'user/logUserOut/pending',
          'user/logUserOut/fulfilled',
          'user/logUserOut/rejected',
          'installation/registerDevice/pending',
          'installation/registerDevice/fulfilled',
          'installation/registerDevice/rejected',
          'installation/unRegisterDevice/pending',
          'installation/unRegisterDevice/fulfilled',
          'installation/unRegisterDevice/rejected',
          'postMessage/setOnEnterScreen/pending',
          'postMessage/setOnEnterScreen/fulfilled',
          'postMessage/setOnEnterScreen/rejected',
          'postMessage/removeOnEnterScreen/pending',
          'postMessage/removeOnEnterScreen/fulfilled',
          'postMessage/removeOnEnterScreen/rejected',
          'partners/fetchPartnerList/pending',
          'partners/fetchPartnerList/fulfilled',
          'partners/fetchPartnerList/rejected',
        ],
      },
    }),
});