import React, { useState } from 'react';
import {
  View,
  Alert,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const auth = getAuth();
const db = getFirestore();

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controller, dispatch] = useMyContextController();

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        const userDoc = await getDoc(doc(db, 'USERS', user.email));
        if (userDoc.exists()) {
          const userData = { ...userDoc.data(), email: user.email, uid: user.uid };
          dispatch({ type: 'SET_USER', payload: userData });

          if (userData.role === 'admin') {
            navigation.navigate('Admin');
          } else {
            navigation.navigate('Customer');
          }
        } else {
          Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng trong Firestore.');
        }
      } else {
        Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng.');
      }
    } catch (e) {
      console.log('Lỗi đăng nhập:', e);
      Alert.alert('Lỗi đăng nhập', e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={require('../asset/logolab3.png')} // Đảm bảo có file logo ở thư mục assets
            style={styles.logo}
            resizeMode="contain"
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            labelStyle={{ fontSize: 16 }}
          >
            Đăng nhập
          </Button>

          <Button mode="text" onPress={() => navigation.navigate('Register')}>
            Đăng ký
          </Button>
          <Button mode="text" onPress={() => navigation.navigate('ForgotPassword')}>
            Quên mật khẩu?
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  loginButton: {
    width: '100%',
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default Login;
