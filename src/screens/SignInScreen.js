import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    const validCredentials = [
      { username: 'admin', password: 'admin' },
      { username: 'user', password: 'user' },
      { username: 'aashu', password: 'aashu' },
    ];

    const isValid = validCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (isValid) {
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Error', 'Invalid credentials. Try "admin"/"admin", "user"/"user", or "aashu"/"aashu".');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <Text style={styles.subtitle}>Sign in to manage your expenses</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#AAB8C2"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#AAB8C2"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button 
          title="Sign In" 
          onPress={handleSignIn} 
          color="#1DA1F2" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#14171A',
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#FFFFFF',
    textAlign: 'center', 
    marginBottom: 10,
  },
  subtitle: { 
    fontSize: 18, 
    color: '#AAB8C2',
    textAlign: 'center', 
    marginBottom: 40,
  },
  input: { 
    height: 50, 
    backgroundColor: '#25282B',
    borderColor: '#AAB8C2', 
    borderWidth: 1, 
    borderRadius: 10, 
    marginBottom: 20, 
    paddingHorizontal: 15, 
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonContainer: { 
    marginTop: 10, 
    borderRadius: 10, 
    overflow: 'hidden',
  },
});

export default SignInScreen;