import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password!');
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Invalid email format! Please check your email.');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        // console.log(res, 'User account signed in!');
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('Error', 'Invalid email! Please check your email.');
            console.log('Invalid email! Email not registered.');
            break;

          case 'auth/wrong-password':
            Alert.alert('Error', 'Invalid password! Please try again.');
            // console.log('Invalid password!');
            break;

          case 'auth/invalid-email':
            Alert.alert(
              'Error',
              'Invalid email format! Please check your email.',
            );
            // console.log('Invalid email format!');
            break;

          case 'auth/invalid-credential':
            Alert.alert(
              'Error',
              'The supplied credential is invalid. Please try again.',
            );
            console.log('Invalid or expired credential!');
            break;

          default:
            Alert.alert('Error', 'An error occurred. Please try again.');
            console.error('Firebase Auth Error:', error.code, error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 5,
  },
  linkText: {
    fontSize: 14,
    color: '#007BFF',
  },
});

export default LoginScreen;
