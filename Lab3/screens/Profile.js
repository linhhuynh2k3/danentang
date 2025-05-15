import React, { useState } from 'react';
import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import { Card, Text, Button, IconButton, TextInput } from 'react-native-paper';
import { useMyContextController, logout, updateProfile, changePassword } from '../store';

const Profile = ({ navigation }) => {
    const [state, dispatch] = useMyContextController();
    const { userLogin } = state;
    const [name, setName] = useState(userLogin?.name || '');
    const [phone, setPhone] = useState(userLogin?.phone || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleUpdateProfile = async () => {
        if (!name || !phone) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        try {
            await updateProfile(userLogin.email, { name, phone });
            Alert.alert('Thành công', 'Cập nhật thông tin thành công');
        } catch (error) {
            Alert.alert('Lỗi', error.message);
        }
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ mật khẩu hiện tại và mật khẩu mới');
            return;
        }
        try {
            await changePassword(currentPassword, newPassword);
            setCurrentPassword('');
            setNewPassword('');
            setShowChangePassword(false);
        } catch (error) {
            Alert.alert('Lỗi', error.message);
        }
    };

    const handleLogout = async () => {
        console.log('handleLogout called'); // Debug: Kiểm tra sự kiện
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn đăng xuất?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Đăng xuất',
                    onPress: async () => {
                        try {
                            console.log('Attempting logout with dispatch:', dispatch); // Debug
                            await logout(dispatch);
                            console.log('Logout successful, navigating to Login'); // Debug
                            navigation.navigate('Login');
                        } catch (error) {
                            console.error('Lỗi đăng xuất:', error);
                            Alert.alert('Lỗi', 'Đăng xuất không thành công: ' + error.message);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleShowInfo = () => {
        const info = `
            Email: ${userLogin?.email || 'Không có'}
            Vai trò: ${userLogin?.role || 'Không xác định'}
            Tên: ${name || 'Không có'}
            Số điện thoại: ${phone || 'Không có'}
        `;
        Alert.alert('Thông tin người dùng', info.trim(), [
            { text: 'Đóng', style: 'cancel' },
        ]);
    };

    if (!userLogin) {
        return (
            <View style={styles.container}>
                <Text>Chưa đăng nhập</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>THÔNG TIN CÁ NHÂN</Text>
                    <Text style={styles.label}>Email: {userLogin.email}</Text>
                    <Text style={styles.label}>Vai trò: {userLogin.role || 'Không xác định'}</Text>
                    <TextInput
                        label="Tên"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Số điện thoại"
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                        mode="outlined"
                        keyboardType="phone-pad"
                    />
                    <Button
                        mode="contained"
                        onPress={handleUpdateProfile}
                        style={styles.button}
                        disabled={!userLogin.role || userLogin.role !== 'customer'}
                    >
                        Cập nhật
                    </Button>
                    <Button
                        mode="contained"
                        onPress={() => setShowChangePassword(true)}
                        style={styles.button}
                        disabled={!userLogin.role}
                    >
                        Đổi mật khẩu
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={handleShowInfo}
                        style={styles.button}
                        icon="information-outline"
                    >
                        Hiển thị thông tin
                    </Button>
                </Card.Content>
            </Card>

            {showChangePassword && (
                <Card style={styles.changePasswordCard}>
                    <Card.Content>
                        <Text style={styles.changePasswordTitle}>ĐỔI MẬT KHẨU</Text>
                        <TextInput
                            label="Mật khẩu hiện tại"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            style={styles.input}
                            mode="outlined"
                            secureTextEntry
                        />
                        <TextInput
                            label="Mật khẩu mới"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            style={styles.input}
                            mode="outlined"
                            secureTextEntry
                        />
                        <Button
                            mode="contained"
                            onPress={handleChangePassword}
                            style={styles.button}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            mode="text"
                            onPress={() => setShowChangePassword(false)}
                            style={styles.button}
                        >
                            Hủy
                        </Button>
                    </Card.Content>
                </Card>
            )}

            <View style={styles.logoutContainer}>
                <IconButton
                    icon="logout"
                    iconColor="#ff4444"
                    size={30}
                    onPress={handleLogout}
                    style={styles.logoutButton}
                />
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    card: {
        marginBottom: 20,
        elevation: 4,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginVertical: 5,
    },
    changePasswordCard: {
        marginBottom: 20,
        elevation: 4,
        borderRadius: 8,
        backgroundColor: '#e0f7fa',
    },
    changePasswordTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    logoutButton: {
        marginRight: 5,
    },
    logoutText: {
        fontSize: 16,
        color: '#ff4444',
    },
});

export default Profile;