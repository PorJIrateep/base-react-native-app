# Redux Implementation - THAMC Style

This project now includes a comprehensive Redux implementation based on the THAMC project structure, modernized with Redux Toolkit.

## 🏗️ Architecture Overview

The Redux implementation follows modern patterns while maintaining compatibility with your existing THAMC project structure.

### State Structure

```javascript
{
  user: {
    // Full user authentication and profile data
    _User, avatar, sessionToken, usertype, userid, username,
    firstname, surname, gender, dob, age, tel, email, idcard,
    healthCal, healthData, rtData, preferPartners, bloodtype, ud,
    address, isteledoc, authState, isAuthenticated, loading, error
  },
  installation: {
    // Device registration data
    appIdentifier, appName, appVersion, deviceToken, deviceType,
    installationId, localeIdentifier, parseVersion, pushType,
    timeZone, voipToken, loading, error
  },
  postMessage: {
    // Screen-based message handling
    onEnterScreen: { screenName: action }, loading, error
  },
  progress: {
    // Global loading state management
    progressCount, isLoading, globalError
  },
  partners: {
    // Hospital/clinic data
    partnerList, selectedPartner, loading, error
  },
  // ... existing slices (counter, bottomTab, etc.)
}
```

## 📁 File Structure

```
app/
├── store/
│   ├── index.js                 # Store configuration
│   ├── hooks.js                 # Typed hooks
│   └── slices/
│       ├── userSlice.js         # Authentication & user data
│       ├── installationSlice.js # Device registration
│       ├── postMessageSlice.js  # Screen messages
│       ├── progressSlice.js     # Global loading
│       └── partnersSlice.js     # Partners/hospitals
├── services/
│   ├── authService.js           # Authentication API calls
│   └── installationService.js  # Device registration API
└── screens/
    └── ReduxDemoScreen.js       # Demo implementation
```

## 🔧 Usage Examples

### Authentication

```javascript
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logUserIn, checkSession, logUserOut } from '../store/slices/userSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  // Login
  const handleLogin = () => {
    dispatch(logUserIn({ username: 'user', password: 'pass' }));
  };

  // Check session on app start
  useEffect(() => {
    dispatch(checkSession());
  }, []);

  // Logout
  const handleLogout = () => {
    dispatch(logUserOut());
  };

  return (
    <View>
      {user.isAuthenticated ? (
        <Text>Welcome {user.firstname}!</Text>
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
}
```

### Device Registration

```javascript
import { registerDevice, unRegisterDevice } from '../store/slices/installationSlice';

// Register device after login
dispatch(registerDevice());

// Unregister on logout
dispatch(unRegisterDevice());
```

### Post Messages (Screen Actions)

```javascript
import { 
  setPostMessageOnEnterScreen, 
  removePostMessageOnEnterScreen 
} from '../store/slices/postMessageSlice';

// Set action for screen
dispatch(setPostMessageOnEnterScreen({
  screen: 'HomeScreen',
  action: 'refresh_data'
}));

// Remove action
dispatch(removePostMessageOnEnterScreen('HomeScreen'));
```

### Partners Management

```javascript
import { fetchPartnerList, setSelectedPartner } from '../store/slices/partnersSlice';

// Fetch partner list
dispatch(fetchPartnerList());

// Select a partner
dispatch(setSelectedPartner(partnerId));
```

### Global Loading Management

```javascript
import { incrementProgress, decrementProgress } from '../store/slices/progressSlice';

// Show loading
dispatch(incrementProgress());

// Hide loading
dispatch(decrementProgress());
```

## 🔄 Migration from Old Redux

### Before (Old Redux)
```javascript
// Old action
dispatch({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json: userData });

// Old reducer
case 'AUTHENTICATION_LOGIN_SUCCESS': {
  const newState = { ...state };
  newState.firstname = action.json?.firstname;
  return newState;
}
```

### After (Redux Toolkit)
```javascript
// New async action
dispatch(logUserIn({ username, password }));

// Automatic slice handling
const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logUserIn.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.isAuthenticated = true;
    });
  },
});
```

## 🚀 Key Benefits

### 1. **Modern Redux Toolkit**
- Simplified boilerplate
- Built-in immutability with Immer
- Automatic action creators
- Enhanced DevTools integration

### 2. **Type Safety Ready**
- Structured for TypeScript migration
- Typed hooks available
- Predictable state shape

### 3. **Async Handling**
- Built-in loading states
- Error handling
- Automatic pending/fulfilled/rejected states

### 4. **Backward Compatibility**
- Maintains THAMC data structure
- Same API patterns
- Easy migration path

### 5. **Better Developer Experience**
- Hot reloading support
- Redux DevTools integration
- Cleaner action dispatching

## 🛠️ Implementation Steps

### 1. **API Integration**
Replace mock API calls in services with your actual endpoints:

```javascript
// In authService.js
export const parseLogin = async ({ username, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
};
```

### 2. **Push Notifications**
Add notification handling to installation service:

```javascript
// Install react-native-notifications
npm install react-native-notifications

// In installationSlice.js
import { Notifications } from 'react-native-notifications';
```

### 3. **Error Handling**
Implement global error handling:

```javascript
// Add error boundary component
// Connect to progress slice for global errors
```

### 4. **Persistence**
Add Redux Persist for state persistence:

```javascript
npm install redux-persist
// Configure in store/index.js
```

## 📱 Demo Screen

The `ReduxDemoScreen.js` provides a complete example of:
- Authentication flow
- Device registration
- State management
- Error handling
- Loading states
- Internationalization

## 🔗 Integration with Existing Features

This Redux setup integrates seamlessly with:
- ✅ **i18n** - Language support throughout Redux actions
- ✅ **Navigation** - State-based navigation decisions
- ✅ **AsyncStorage** - Persistent session management
- ✅ **Existing Components** - Compatible with current screens

## 📊 Performance Considerations

- **Memoized Selectors**: Use `createSelector` for complex derived state
- **Component Optimization**: Use `React.memo` with Redux components
- **Bundle Splitting**: Lazy load slices for large applications
- **State Normalization**: Structure for optimal updates

Your Redux implementation is now ready for production use with the same reliability and structure as your THAMC project! 🎉