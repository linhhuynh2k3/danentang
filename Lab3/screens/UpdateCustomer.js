import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const UpdateCustomer = ({ route, navigation }) => {
    const { customer } = route.params;
    const [fullName, setFullName] = useState(customer.fullName);
    const [phone, setPhone] = useState(customer.phone);
    const [address, setAddress] = useState(customer.address);

    const handleUpdate = async () => {
        try {
            await firestore().collection('USERS').doc(customer.email).update({
                fullName,
                phone,
                address
            });
            Alert.alert("Thành công", "Cập nhật thông tin khách hàng thành công");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
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
            <Button mode="contained" onPress={handleUpdate}>
                Cập nhật
            </Button>
            <Button mode="outlined" onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
                Hủy
            </Button>
        </View>
    );
};

export default UpdateCustomer;