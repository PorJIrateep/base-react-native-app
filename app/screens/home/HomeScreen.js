import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { increment, decrement, reset } from '../../store/slices/counterSlice';
import { loginSuccess, logout } from '../../store/slices/userSlice';
import I18n from '../../i18n';

export default function HomeScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter.value);
  const user = useAppSelector((state) => state.user);

  const handleLogin = () => {
    dispatch(loginSuccess({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('greeting')} Welcome to Home Screen!</Text>
      <Text style={styles.subtitle}>Redux Demo</Text>
      
      {/* Language switcher */}
      <View style={styles.languageContainer}>
        <TouchableOpacity 
          style={styles.langButton}
          onPress={() => I18n.changeLanguage('en')}
        >
          <Text>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.langButton}
          onPress={() => I18n.changeLanguage('th')}
        >
          <Text>TH</Text>
        </TouchableOpacity>
      </View>
      
      {/* Counter Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Counter: {counter}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.smallButton]}
            onPress={() => dispatch(increment())}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.smallButton]}
            onPress={() => dispatch(decrement())}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.smallButton]}
            onPress={() => dispatch(reset())}
          >
            <Text style={styles.buttonText}>{I18n.t('Reset_New_Code')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {I18n.t('You')}: {user.isAuthenticated ? user.name : I18n.t('You_re_not_login')}
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={user.isAuthenticated ? handleLogout : handleLogin}
        >
          <Text style={styles.buttonText}>
            {user.isAuthenticated ? I18n.t('Log_Out') : I18n.t('Login')}
          </Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, styles.navigationButton]}
        onPress={() => navigation.navigate('Details', { 
          itemId: 86, 
          otherParam: 'anything you want here' 
        })}
      >
        <Text style={styles.buttonText}>{I18n.t('Detail')}</Text>
      </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#38434D',
    marginBottom: 32,
    textAlign: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  langButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  section: {
    marginBottom: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  smallButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navigationButton: {
    marginTop: 16,
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});