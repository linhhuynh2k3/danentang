import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('Đăng ký thành công!');
            navigation.replace('Dashboard'); // Chuyển đến màn hình Dashboard
        } catch (error) {
            console.error("Registration error", error);
            Alert.alert('Đăng ký thất bại', error.message);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Đăng ký" onPress={handleRegister} />
        </View>
    );
};

export default Register;
