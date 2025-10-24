import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import I18n from '../i18n'; // Your new i18n setup

export default function I18nExample() {
  const [currentLanguage, setCurrentLanguage] = useState(I18n.language);

  const changeLanguage = (lang) => {
    I18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>i18n Example</Text>
      
      <Text style={styles.currentLang}>
        Current Language: {currentLanguage}
      </Text>
      
      {/* Using the same I18n.t() API as before */}
      <View style={styles.translationContainer}>
        <Text style={styles.translatedText}>
          {I18n.t('Login')}
        </Text>
        <Text style={styles.translatedText}>
          {I18n.t('Password')}
        </Text>
        <Text style={styles.translatedText}>
          {I18n.t('greeting')}
        </Text>
        <Text style={styles.translatedText}>
          {I18n.t('Menu')}
        </Text>
        <Text style={styles.translatedText}>
          {I18n.t('Continue')}
        </Text>
      </View>

      {/* Language switcher */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, currentLanguage === 'en' && styles.activeButton]}
          onPress={() => changeLanguage('en')}
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, currentLanguage === 'th' && styles.activeButton]}
          onPress={() => changeLanguage('th')}
        >
          <Text style={styles.buttonText}>ไทย</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  currentLang: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  translationContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  translatedText: {
    fontSize: 18,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    minWidth: 120,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});