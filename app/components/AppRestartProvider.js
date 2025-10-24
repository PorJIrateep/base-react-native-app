import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../i18n';

// Context for managing app restart state
export const AppRestartContext = React.createContext();

export const AppRestartProvider = ({ children }) => {
  const [appKey, setAppKey] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);

  const restartApp = () => {
    setIsRestarting(true);
    
    // Brief loading state
    setTimeout(() => {
      setAppKey(prev => prev + 1); // Force re-render of entire app
      setIsRestarting(false);
    }, 500);
  };

  const changeLanguageWithRestart = async (lang) => {
    try {
      // Save language preference
      await AsyncStorage.setItem('app_language', lang);
      
      // Change language
      await I18n.changeLanguageWithoutRestart(lang);
      
      // Restart app UI
      restartApp();
      
    } catch (error) {
      console.log('Error changing language:', error);
    }
  };

  return (
    <AppRestartContext.Provider 
      value={{ 
        restartApp, 
        changeLanguageWithRestart,
        isRestarting 
      }}
    >
      <AppWrapper key={appKey} isRestarting={isRestarting}>
        {children}
      </AppWrapper>
    </AppRestartContext.Provider>
  );
};

const AppWrapper = ({ children, isRestarting }) => {
  if (isRestarting) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 15, fontSize: 16 }}>
          Changing language...
        </Text>
      </View>
    );
  }

  return children;
};

// Hook to use restart functionality
export const useAppRestart = () => {
  const context = React.useContext(AppRestartContext);
  if (!context) {
    throw new Error('useAppRestart must be used within AppRestartProvider');
  }
  return context;
};