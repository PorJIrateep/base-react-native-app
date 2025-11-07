import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en';
import th from './locales/th';
import { reloadAppAsync } from 'expo';

// Key for storing language preference
const LANGUAGE_KEY = 'app_language';

// Initialize with stored language or default
const initLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    return storedLanguage || 'en';
  } catch (error) {
    console.log('Error loading stored language:', error);
    return 'en';
  }
};

// Initialize i18n
const initI18n = async () => {
  const initialLanguage = await initLanguage();
  
  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      lng: initialLanguage,
      debug: false,
      
      resources: {
        en: {
          translation: en,
        },
        th: {
          translation: th,
        },
      },
      
      interpolation: {
        escapeValue: false,
      },
    });
};

// Initialize the i18n
initI18n();

// Enhanced change language function with restart
const changeLanguageWithRestart = async (lang) => {
  try {
    // Save language preference
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    
    // Change language in i18n
    await i18n.changeLanguage(lang);
    
    // Restart the app to apply changes everywhere
    setTimeout(() => {
      // RNRestart.restart();
      reloadAppAsync();
    }, 100); // Small delay to ensure async operations complete
    
  } catch (error) {
    console.log('Error changing language:', error);
    // Fallback to regular language change without restart
    i18n.changeLanguage(lang);
  }
};

// Create a wrapper object that mimics the old API
const I18n = {
  t: (key, options) => i18n.t(key, options),
  changeLanguage: changeLanguageWithRestart, // Use the enhanced version
  changeLanguageWithoutRestart: (lang) => i18n.changeLanguage(lang), // Option without restart
  get language() {
    return i18n.language;
  },
  get currentLanguage() {
    return i18n.language;
  },
  // Keep the old properties for compatibility
  fallbacks: true,
  translations: {
    en,
    th,
  },
  // Additional helper methods
  isRTL: () => false, // Add RTL support if needed
  getLanguages: () => Object.keys(i18n.options.resources),
  // Storage methods
  getStoredLanguage: () => AsyncStorage.getItem(LANGUAGE_KEY),
  clearStoredLanguage: () => AsyncStorage.removeItem(LANGUAGE_KEY),
};

export default I18n;