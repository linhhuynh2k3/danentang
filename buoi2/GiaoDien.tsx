import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  StyleSheet,
} from 'react-native';

export default function GiaoDien() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Alert.alert('Thông tin đăng nhập', `Username: ${username}\nPassword: ${password}`);
  };

  return (
    <ImageBackground
    source={require('./bg.jpg')}

      style={styles.background}
    >
      <View style={styles.container}>
      <Image
        source={require('./images.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />


        <View style={styles.form}>
          <Text style={styles.registerText}>REGISTER</Text>

          <TextInput
            placeholder="USERNAME"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholderTextColor="#000"
          />
          <TextInput
            placeholder="PASSWORD"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#000"
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: '120%',
    height: 245,
    marginBottom: 20,
    padding: 10,
  },
  form: {
    width: '100%',
    backgroundColor: 'rgba(255, 215, 0, 0.8)', // nền vàng mờ
    padding: 20,
    borderRadius: 10,
  },
  registerText: {
    alignSelf: 'flex-end',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loginButton: {
    backgroundColor: '#C76D6D',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
