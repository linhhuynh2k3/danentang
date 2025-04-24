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

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repasswordError, setRePasswordError] = useState('');

  const handleSignUp = () => {
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setRePasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!repassword) {
      setRePasswordError('Please confirm your password');
      isValid = false;
    } else if (password && repassword !== password) {
      setRePasswordError('Passwords do not match');
      isValid = false;
    }

    if (isValid) {
      Alert.alert('SignUp', 'SignUp successful!');
      // 👉 TODO: Gửi dữ liệu đăng ký lên server ở đây
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Create a new account! </Text>
      {/* Email Input */}{' '}
      <View style={styles.inputWrapper}>
        <Icon name="envelope" size={20} color="#666" style={styles.icon} />{' '}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
          }}
          value={email}
          keyboardType="email-address"
        />
      </View>{' '}
      {emailError ? <Text style={styles.error}> {emailError} </Text> : null}
      {/* Password Input */}{' '}
      <View style={styles.inputWrapper}>
        <Icon name="lock" size={20} color="#666" style={styles.icon} />{' '}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          onChangeText={text => {
            setPassword(text);
            setPasswordError('');
          }}
          value={password}
        />{' '}
      </View>{' '}
      {passwordError ? (
        <Text style={styles.error}> {passwordError} </Text>
      ) : null}
      {/* Confirm Password Input */}{' '}
      <View style={styles.inputWrapper}>
        <Icon name="lock" size={20} color="#666" style={styles.icon} />{' '}
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          onChangeText={text => {
            setRePassword(text);
            setRePasswordError('');
          }}
          value={repassword}
        />{' '}
      </View>{' '}
      {repasswordError ? (
        <Text style={styles.error}> {repasswordError} </Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}> Signup </Text>{' '}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}> Already have an account ? </Text>{' '}
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
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
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
  link: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 15,
  },
});
