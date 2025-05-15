import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { getFirestore, collection, doc, setDoc } from '@react-native-firebase/firestore';

// Khởi tạo auth và firestore bằng modular API
const auth = getAuth();
const db = getFirestore();

const Register = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const USERS = collection(db, "USERS"); // Sử dụng modular API để truy cập collection

    const handleRegister = async () => {
        try {
            // Sử dụng createUserWithEmailAndPassword từ modular API
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // Sử dụng setDoc để lưu dữ liệu vào Firestore
            await setDoc(doc(USERS, email), {
                fullName,
                email,
                phone,
                address,
                role: "customer"
            });
            Alert.alert("Đăng ký thành công", "Bạn đã đăng ký thành công!");
            navigation.navigate("Login");
        } catch (e) {
            Alert.alert("Lỗi đăng ký", e.message);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                label="Họ và tên"
                value={fullName}
                onChangeText={setFullName}
                style={{ marginBottom: 10 }}
            />
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
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Địa chỉ"
                value={address}
                onChangeText={setAddress}
                style={{ marginBottom: 20 }}
            />
            <Button mode="contained" onPress={handleRegister}>
                Đăng ký
            </Button>
            <Button mode="text" onPress={() => navigation.navigate("Login")} style={{ marginTop: 10 }}>
                Đã có tài khoản? Đăng nhập
            </Button>
        </View>
    );
};

export default Register;