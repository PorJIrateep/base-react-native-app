import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authService from '../../services/authService';
import { registerDevice } from './installationSlice';

// Initial state based on your THAMC authentication reducer
const initialState = {
  _User: '',
  avatar: '',
  sessionToken: '',
  usertype: '',
  _UserDetail: '',
  userid: '',
  username: '',
  firstname: '',
  surname: '',
  firstname_en: '',
  surname_en: '',
  gender: '',
  dob: '',
  age: '',
  tel: '',
  idcard: '',
  healthCal: {
    bmr: 2000,
    macnutr: {
      CARB_PC: 55,
      PROT_PC: 25,
      FAT_PC: 20,
      CARB_G: 137,
      PROT_G: 62,
      FAT_G: 22,
      SOD_G: 2300,
      CARB_PM: 27.4,
      PROT_PM: 12.4,
      FAT_PM: 4.4,
    },
  },
  healthData: {
    hei1: 0,
    wei1: 0,
  },
  rtData: {},
  preferPartners: [],
  phn: '',
  bloodtype: '',
  ud: [],
  address: '',
  email: '',
  isteledoc: false,
  authState: 'loading',
  // Additional fields for compatibility
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunks for authentication actions
export const loginBySession = createAsyncThunk(
  'user/loginBySession',
  async (sessionToken, { dispatch, rejectWithValue }) => {
    try {
      if (!sessionToken || sessionToken === "undefined") {
        throw new Error('Invalid session token');
      }

      await AsyncStorage.setItem("@SESSIONTOKEN", sessionToken);
      
      const user = await authService.getUserDetail(sessionToken);
      if (!user?.ok || !user?.payload) {
        throw new Error('Failed to get user details');
      }

      // Save account session
      await authService.saveAccountSession({
        userid: user.payload.userid,
        username: user.payload.username,
        user: user.payload,
        sessionToken,
      });

      // Register device after successful login
      dispatch(registerDevice());

      return authService.setAuthenticationPayload(user.payload);
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
      });
    }
  }
);

export const logUserIn = createAsyncThunk(
  'user/logUserIn',
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.parseLogin({ username, password });
      
      if (!response?.ok) {
        throw new Error('Login failed');
      }

      const sessionToken = response.sessiontoken || response.payload;
      if (!sessionToken || sessionToken === "undefined") {
        throw new Error('Invalid session token received');
      }

      await AsyncStorage.setItem("@SESSIONTOKEN", sessionToken);

      const user = await authService.getUserDetail(sessionToken);
      if (!user?.ok || !user?.payload) {
        throw new Error('Failed to get user details');
      }

      // Save account session
      await authService.saveAccountSession({
        userid: user.payload.userid,
        username: user.payload.username,
        user: user.payload,
        sessionToken,
      });

      // Register device after successful login
      dispatch(registerDevice());

      return authService.setAuthenticationPayload(user.payload);
    } catch (error) {
      return rejectWithValue({
        message: error?.message || 'Login failed',
        code: error?.code || 'LOGIN_ERROR',
      });
    }
  }
);

export const checkSession = createAsyncThunk(
  'user/checkSession',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const sessionToken = await AsyncStorage.getItem("@SESSIONTOKEN");
      
      if (sessionToken) {
        // Get user language preference
        const preferLang = await authService.getUserLanguagePreference(sessionToken);
        // You can dispatch language change here if needed
        // I18n.changeLanguage(preferLang);

        const user = await authService.getUserDetail(sessionToken);
        if (!user?.ok || !user?.payload) {
          throw new Error('Session invalid');
        }

        return authService.setAuthenticationPayload(user.payload);
      } else {
        return rejectWithValue({ message: 'No session token found' });
      }
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
      });
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userRegister, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.parseSignUp(userRegister);
      
      if (!response?.ok) {
        throw new Error('Sign up failed');
      }

      // Auto login after successful signup
      const loginResult = await dispatch(logUserIn({
        username: userRegister.username,
        password: userRegister.password,
      }));

      return loginResult.payload;
    } catch (error) {
      return rejectWithValue({
        message: error?.message || 'Sign up failed',
        code: error?.code || 'SIGNUP_ERROR',
      });
    }
  }
);

export const logUserOut = createAsyncThunk(
  'user/logUserOut',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem("@SESSIONTOKEN");
      await AsyncStorage.removeItem("@INSTALLATION_ID");
      await AsyncStorage.removeItem("@FIRST_LOGIN");
      // Add any other cleanup logic here
      return true;
    } catch (error) {
      return rejectWithValue({
        message: error?.message,
        code: error?.code,
      });
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Synchronous reducers for immediate state updates
    updateUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    updateHealthData: (state, action) => {
      state.healthData = { ...state.healthData, ...action.payload };
    },
    updateHealthCal: (state, action) => {
      state.healthCal = { ...state.healthCal, ...action.payload };
    },
    updateRtData: (state, action) => {
      state.rtData = { ...state.rtData, ...action.payload };
    },
    setPreferPartners: (state, action) => {
      state.preferPartners = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAuthState: (state) => {
      return { ...initialState, authState: 'idle' };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login by session
      .addCase(loginBySession.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.authState = 'loading';
      })
      .addCase(loginBySession.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.loading = false;
        state.isAuthenticated = true;
        state.authState = 'success';
        state.error = null;
      })
      .addCase(loginBySession.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.authState = 'fail';
        state.error = action.payload;
      })
      // Regular login
      .addCase(logUserIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.authState = 'loading';
      })
      .addCase(logUserIn.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.loading = false;
        state.isAuthenticated = true;
        state.authState = 'success';
        state.error = null;
      })
      .addCase(logUserIn.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.authState = 'fail';
        state.error = action.payload;
      })
      // Check session
      .addCase(checkSession.pending, (state) => {
        state.authState = 'loading';
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.isAuthenticated = true;
        state.authState = 'success';
        state.error = null;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.authState = 'fail';
        state.error = action.payload;
      })
      // Logout
      .addCase(logUserOut.fulfilled, (state) => {
        return { ...initialState, authState: 'idle' };
      })
      .addCase(logUserOut.rejected, (state, action) => {
        state.error = action.payload;
        // Still reset auth state even if logout fails
        return { ...initialState, authState: 'fail', error: action.payload };
      });
  },
});

// Action creators are generated for each case reducer function
export const { 
  updateUser,
  updateHealthData,
  updateHealthCal,
  updateRtData,
  setPreferPartners,
  clearError,
  resetAuthState,
} = userSlice.actions;

// Legacy actions for backward compatibility
export const loginStart = () => ({ type: 'user/loginBySession/pending' });
export const loginSuccess = updateUser;
export const loginFailure = (error) => ({ type: 'user/loginBySession/rejected', payload: error });
export const logout = logUserOut;

export default userSlice.reducer;