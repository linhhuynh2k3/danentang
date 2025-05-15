import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { useMyContextController, updateProfile, changePassword } from '../store';

const Profile = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const [fullName, setFullName] = useState(userLogin?.fullName || '');
    const [phone, setPhone] = useState(userLogin?.phone || '');
    const [address, setAddress] = useState(userLogin?.address || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const hasErrorNewPassword = () => newPassword.length < 6;
    const hasErrorConfirmPassword = () => confirmPassword !== newPassword;

    const handleUpdateProfile = async () => {
        await updateProfile(userLogin.email, { fullName, phone, address });
        dispatch({ type: 'USER_LOGIN', value: { ...userLogin, fullName, phone, address } });
    };

    const handleChangePassword = async () => {
        if (hasErrorNewPassword() || hasErrorConfirmPassword()) {
            Alert.alert("Lỗi", "Mật khẩu mới không hợp lệ hoặc không khớp");
            return;
        }
        await changePassword(currentPassword, newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                label="Họ tên"
                value={fullName}
                onChangeText={setFullName}
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
            <Button mode="contained" onPress={handleUpdateProfile}>
                Cập nhật thông tin
            </Button>

            <TextInput
                label="Mật khẩu hiện tại"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                style={{ marginTop: 20, marginBottom: 10 }}
            />
            <TextInput
                label="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                style={{ marginBottom: 10 }}
            />
            <HelperText type="error" visible={hasErrorNewPassword()}>
                Mật khẩu mới ít nhất 6 ký tự
            </HelperText>
            <TextInput
                label="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={{ marginBottom: 10 }}
            />
            <HelperText type="error" visible={hasErrorConfirmPassword()}>
                Mật khẩu xác nhận không khớp
            </HelperText>
            <Button mode="contained" onPress={handleChangePassword}>
                Đổi mật khẩu
            </Button>
        </View>
    );
};

export default Profile;