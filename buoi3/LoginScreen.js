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

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    let valid = true;

    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Email validation
    if (!email) {
      setEmailError('Email is a required field');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is a required field');
      valid = false;
    }

    if (valid) {
      Alert.alert('Login', 'Login successful!');
      // 👉 Thêm logic đăng nhập ở đây (gọi API, lưu token, v.v.)
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="fire" size={80} color="red" style={{alignSelf: 'center'}} />{' '}
      <Text style={styles.title}> Welcome back! </Text>
      {/* Email Input */}{' '}
      <View style={styles.inputWrapper}>
        <Icon name="envelope" size={20} color="#666" style={styles.icon} />{' '}
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
          }}
          keyboardType="email-address"
        />
      </View>{' '}
      {emailError ? <Text style={styles.error}> {emailError} </Text> : null}
      {/* Password Input */}{' '}
      <View style={styles.inputWrapper}>
        <Icon name="lock" size={20} color="#666" style={styles.icon} />{' '}
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={text => {
            setPassword(text);
            setPasswordError('');
          }}
          secureTextEntry
        />
      </View>{' '}
      {passwordError ? (
        <Text style={styles.error}> {passwordError} </Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}> Login </Text>{' '}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}> Create a new account ? </Text>{' '}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.link}> Forgot Password ? </Text>{' '}
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
    marginBottom: 20,
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
  error: {
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
    fontSize: 12,
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
