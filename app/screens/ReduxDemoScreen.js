import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  loginBySession,
  logUserIn,
  checkSession,
  signUp,
  logUserOut,
  updateUser,
  updateHealthData,
  clearError,
} from '../store/slices/userSlice';
import {
  registerDevice,
  unRegisterDevice,
} from '../store/slices/installationSlice';
import {
  setPostMessageOnEnterScreen,
  removePostMessageOnEnterScreen,
} from '../store/slices/postMessageSlice';
import {
  fetchPartnerList,
  setPartner,
  updatePartner,
  clearPartner,
} from '../store/slices/partnersSlice';
import I18n from '../i18n';

export default function ReduxDemoScreen({ navigation }) {
  const dispatch = useAppDispatch();
  
  // Selectors
  const user = useAppSelector((state) => state.user);
  const installation = useAppSelector((state) => state.installation);
  const postMessage = useAppSelector((state) => state.postMessage);
  const progress = useAppSelector((state) => state.progress);
  const partners = useAppSelector((state) => state.partners);
  
  // Local state for form inputs
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('password123');
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    // Check session on component mount
    dispatch(checkSession());
    dispatch(fetchPartnerList());
  }, [dispatch]);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    dispatch(logUserIn({ username, password }));
  };

  const handleLoginBySession = () => {
    if (!sessionToken) {
      Alert.alert('Error', 'Please enter session token');
      return;
    }
    dispatch(loginBySession(sessionToken));
  };

  const handleSignUp = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    dispatch(signUp({ username, password, email: `${username}@example.com` }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => dispatch(logUserOut()) },
      ]
    );
  };

  const handleRegisterDevice = () => {
    dispatch(registerDevice());
  };

  const handleUnregisterDevice = () => {
    dispatch(unRegisterDevice());
  };

  const handleSetPostMessage = () => {
    dispatch(setPostMessageOnEnterScreen({
      screen: 'HomeScreen',
      action: 'refresh_data'
    }));
  };

  const handleUpdateHealthData = () => {
    dispatch(updateHealthData({
      hei1: 175,
      wei1: 75,
    }));
  };

  const renderUserInfo = () => {
    if (!user.isAuthenticated) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{I18n.t('Your_Profiles')}</Text>
        <Text>ID: {user.userid}</Text>
        <Text>Username: {user.username}</Text>
        <Text>Name: {user.firstname} {user.surname}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Auth State: {user.authState}</Text>
        <Text>Height: {user.healthData?.hei1 || 0} cm</Text>
        <Text>Weight: {user.healthData?.wei1 || 0} kg</Text>
      </View>
    );
  };

  const renderInstallationInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Installation Info</Text>
      <Text>Installation ID: {installation.installationId || 'Not set'}</Text>
      <Text>Device Type: {installation.deviceType || 'Unknown'}</Text>
      <Text>App Version: {installation.appVersion || 'Unknown'}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.smallButton]}
          onPress={handleRegisterDevice}
          disabled={installation.loading}
        >
          <Text style={styles.buttonText}>Register Device</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.smallButton, styles.dangerButton]}
          onPress={handleUnregisterDevice}
          disabled={installation.loading}
        >
          <Text style={styles.buttonText}>Unregister</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPostMessages = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Post Messages</Text>
      <Text>Messages: {Object.keys(postMessage.onEnterScreen).length}</Text>
      {Object.entries(postMessage.onEnterScreen).map(([screen, action]) => (
        <Text key={screen}>• {screen}: {action}</Text>
      ))}
      <TouchableOpacity 
        style={[styles.button, styles.smallButton]}
        onPress={handleSetPostMessage}
      >
        <Text style={styles.buttonText}>Set Message</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPartners = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{I18n.t('Partners_And_Families')}</Text>
      <Text>Partner: {partners.partner?.name || 'None'}</Text>
      {partners.partner?.id && (
        <View>
          <Text>• Name: {partners.partner.name}</Text>
          <Text>• Type: {partners.partner.type}</Text>
          <Text>• Address: {partners.partner.address}</Text>
          <Text>• Phone: {partners.partner.phone}</Text>
          {partners.partner.facilities && (
            <Text>• Facilities: {partners.partner.facilities.join(', ')}</Text>
          )}
        </View>
      )}
    </View>
  );

  if (user.authState === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Redux Demo (THAMC Style)</Text>
      
      {/* Authentication Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {user.isAuthenticated ? I18n.t('You_re_not_login') : I18n.t('Login')}
        </Text>
        
        {!user.isAuthenticated ? (
          <>
            <TextInput
              style={styles.input}
              placeholder={I18n.t('Username')}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder={I18n.t('Password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.button}
                onPress={handleLogin}
                disabled={user.loading}
              >
                <Text style={styles.buttonText}>
                  {user.loading ? 'Logging in...' : I18n.t('Login')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]}
                onPress={handleSignUp}
                disabled={user.loading}
              >
                <Text style={styles.buttonText}>{I18n.t('SignUP')}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.orText}>OR</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Session Token"
              value={sessionToken}
              onChangeText={setSessionToken}
            />
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={handleLoginBySession}
              disabled={user.loading}
            >
              <Text style={styles.buttonText}>Login by Session</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={[styles.button, styles.dangerButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>{I18n.t('Log_Out')}</Text>
          </TouchableOpacity>
        )}
        
        {user.error && (
          <Text style={styles.errorText}>
            Error: {user.error.message}
          </Text>
        )}
      </View>

      {/* User Info */}
      {renderUserInfo()}

      {/* Health Data Update */}
      {user.isAuthenticated && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Data</Text>
          <TouchableOpacity 
            style={[styles.button, styles.smallButton]}
            onPress={handleUpdateHealthData}
          >
            <Text style={styles.buttonText}>Update Health Data</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Installation Info */}
      {renderInstallationInfo()}

      {/* Post Messages */}
      {renderPostMessages()}

      {/* Partner Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Partner Actions (THAMC Style)</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => dispatch(fetchPartnerList())}
        >
          <Text style={styles.buttonText}>Fetch Partner (PARTNER_LIST)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => dispatch(setPartner({
            id: '2',
            name: 'Custom Hospital',
            type: 'hospital',
            address: '456 Test St',
            phone: '555-0123'
          }))}
        >
          <Text style={styles.buttonText}>Set Custom Partner</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => dispatch(clearPartner())}
        >
          <Text style={styles.buttonText}>Clear Partner</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress Actions (THAMC Style)</Text>
        <Text>Current Progress: {progress ? 'True' : 'False'}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => dispatch(incrementProgress())}
        >
          <Text style={styles.buttonText}>Increment Progress (True)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => dispatch(decrementProgress())}
        >
          <Text style={styles.buttonText}>Decrement Progress (False)</Text>
        </TouchableOpacity>
      </View>

      {/* Partners */}
      {renderPartners()}

      {/* Global Loading State */}
      {progress && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Loading</Text>
          <ActivityIndicator color="#007AFF" />
          <Text>Loading: {progress ? 'True' : 'False'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    minWidth: 100,
  },
  smallButton: {
    flex: 0,
    paddingHorizontal: 16,
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#dc3545',
    marginTop: 10,
    textAlign: 'center',
  },
});