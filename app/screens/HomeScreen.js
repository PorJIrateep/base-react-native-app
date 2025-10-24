import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { increment, decrement, reset } from '../store/slices/counterSlice';
import { loginSuccess, logout } from '../store/slices/userSlice';

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
      <Text style={styles.title}>Welcome to Home Screen!</Text>
      <Text style={styles.subtitle}>Redux Demo</Text>
      
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
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          User: {user.isAuthenticated ? user.name : 'Not logged in'}
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={user.isAuthenticated ? handleLogout : handleLogin}
        >
          <Text style={styles.buttonText}>
            {user.isAuthenticated ? 'Logout' : 'Login'}
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
        <Text style={styles.buttonText}>Go to Details</Text>
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