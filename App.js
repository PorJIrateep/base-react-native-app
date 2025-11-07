import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { store } from './app/store';
import AppScreenContainer from './app/screens/AppScreenContainer';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          'LINESeedSansTH-Regular': require('./assets/fonts/LINESeedSansTH-Regular.otf'),
          'LINESeedSansTH-Bold': require('./assets/fonts/LINESeedSansTH-Bold.otf'),
          'LINESeedSansTH_Bold': require('./assets/fonts/LINESeedSansTH_Bold.otf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppScreenContainer />
      </SafeAreaProvider>
    </Provider>
  );
}
