import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import I18n from '../i18n';

export default function LanguageSettings() {
  const [isChanging, setIsChanging] = useState(false);
  const [currentLang, setCurrentLang] = useState(I18n.language);

  const handleLanguageChange = async (lang) => {
    if (lang === currentLang) return;

    Alert.alert(
      I18n.t('App_language'),
      I18n.t('Change_Pass') + ' ' + (lang === 'en' ? 'English' : 'ไทย') + '?',
      [
        {
          text: I18n.t('Cancel'),
          style: 'cancel',
        },
        {
          text: I18n.t('Confirm'),
          onPress: async () => {
            setIsChanging(true);
            
            // Show a brief loading state
            setTimeout(async () => {
              try {
                await I18n.changeLanguage(lang);
                setCurrentLang(lang);
              } catch (error) {
                console.log('Error changing language:', error);
                Alert.alert('Error', 'Failed to change language');
              } finally {
                setIsChanging(false);
              }
            }, 500);
          },
        },
      ]
    );
  };

  const handleChangeWithoutRestart = (lang) => {
    I18n.changeLanguageWithoutRestart(lang);
    setCurrentLang(lang);
  };

  if (isChanging) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>
          {I18n.t('Change_Pass')}...
        </Text>
        <Text style={styles.restartText}>
          App will restart to apply changes
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('App_language')}</Text>
      <Text style={styles.subtitle}>
        Current: {currentLang === 'en' ? 'English' : 'ไทย'}
      </Text>
      
      <View style={styles.languageSection}>
        <Text style={styles.sectionTitle}>Change Language (with restart):</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.langButton, 
              currentLang === 'en' && styles.activeLangButton
            ]}
            onPress={() => handleLanguageChange('en')}
            disabled={currentLang === 'en'}
          >
            <Text style={[
              styles.langButtonText,
              currentLang === 'en' && styles.activeLangButtonText
            ]}>
              English
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.langButton, 
              currentLang === 'th' && styles.activeLangButton
            ]}
            onPress={() => handleLanguageChange('th')}
            disabled={currentLang === 'th'}
          >
            <Text style={[
              styles.langButtonText,
              currentLang === 'th' && styles.activeLangButtonText
            ]}>
              ไทย
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.languageSection}>
        <Text style={styles.sectionTitle}>Quick Switch (no restart):</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.quickButton}
            onPress={() => handleChangeWithoutRestart('en')}
          >
            <Text style={styles.quickButtonText}>EN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickButton}
            onPress={() => handleChangeWithoutRestart('th')}
          >
            <Text style={styles.quickButtonText}>TH</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.note}>
          Note: Some parts may not update without restart
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Translation Test:</Text>
        <Text style={styles.translatedText}>{I18n.t('greeting')}</Text>
        <Text style={styles.translatedText}>{I18n.t('Login')}</Text>
        <Text style={styles.translatedText}>{I18n.t('Continue')}</Text>
        <Text style={styles.translatedText}>{I18n.t('Menu')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  languageSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  langButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  activeLangButton: {
    backgroundColor: '#007AFF',
  },
  langButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activeLangButtonText: {
    color: '#fff',
  },
  quickButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  note: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoSection: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  translatedText: {
    fontSize: 14,
    marginBottom: 5,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 15,
    textAlign: 'center',
  },
  restartText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});