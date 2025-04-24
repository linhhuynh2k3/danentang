import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ResetPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleReset = () => {
    if (!email) {
      setError('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email format');
    } else {
      setError('');
      Alert.alert('Success', 'Reset link has been sent to your email.');
      setEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Reset your password </Text>
      <View style={styles.inputWrapper}>
        <Icon name="envelope" size={20} color="#666" style={styles.icon} />{' '}
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#999"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>{' '}
      {error ? <Text style={styles.error}> {error} </Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}> Send Reset Email </Text>{' '}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}> Go back to Login </Text>{' '}
      </TouchableOpacity>{' '}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  icon: {marginRight: 10},
  input: {flex: 1, paddingVertical: 12, fontSize: 16},
  error: {color: 'red', alignSelf: 'flex-start', marginTop: 5},
  button: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  link: {textAlign: 'center', color: 'blue', marginTop: 15},
});
