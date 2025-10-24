import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { incrementByAmount } from '../store/slices/counterSlice';

export default function DetailsScreen({ route, navigation }) {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter.value);
  const user = useAppSelector((state) => state.user);
  
  // Get parameters passed from the previous screen
  const { itemId, otherParam } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.subtitle}>Here are the details!</Text>
      
      {/* Redux State Display */}
      <View style={styles.section}>
        <Text style={styles.infoText}>Counter Value: {counter}</Text>
        {user.isAuthenticated && (
          <>
            <Text style={styles.infoText}>User: {user.name}</Text>
            <Text style={styles.infoText}>Email: {user.email}</Text>
          </>
        )}
      </View>
      
      {itemId && (
        <Text style={styles.paramText}>Item ID: {itemId}</Text>
      )}
      
      {otherParam && (
        <Text style={styles.paramText}>Other Parameter: {otherParam}</Text>
      )}
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => dispatch(incrementByAmount(5))}
      >
        <Text style={styles.buttonText}>Add 5 to Counter</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#38434D',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 200,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
    color: '#333',
  },
  paramText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  button: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 120,
  },
  secondaryButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});