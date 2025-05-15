import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
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
      console.log('User data after login:', user); // Debug: Kiểm tra user

      if (user) {
        // Lấy thông tin người dùng từ Firestore (bao gồm role)
        const userDoc = await getDoc(doc(db, 'USERS', user.email));
        if (userDoc.exists()) {
          const userData = { ...userDoc.data(), email: user.email, uid: user.uid };
          console.log('User data from Firestore:', userData); // Debug: Kiểm tra dữ liệu từ Firestore
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
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleLogin}>
        Đăng nhập
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Register')} style={{ marginTop: 10 }}>
        Đăng ký
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('ForgotPassword')} style={{ marginTop: 10 }}>
        Quên mật khẩu?
      </Button>
    </View>
  );
};

export default Login;