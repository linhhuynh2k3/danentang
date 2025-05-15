import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const db = getFirestore();

const AddNewService = ({ navigation }) => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [controller] = useMyContextController();
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin === null || userLogin === undefined) return;

        console.log('UserLogin trong AddNewService:', userLogin);

        if (!userLogin) {
            Alert.alert('Lỗi', 'Bạn cần đăng nhập để sử dụng chức năng này.');
            navigation.goBack();
            return;
        }

        if (userLogin.role !== 'admin') {
            Alert.alert('Lỗi', 'Chỉ admin mới có thể thêm dịch vụ.');
            navigation.goBack();
        }
    }, [userLogin, navigation]);


    const handleAddService = async () => {
        if (!serviceName || !description || !price) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }

        try {
            const servicesCollection = collection(db, 'Services');
            await addDoc(servicesCollection, {
                name: serviceName,
                description,
                price: parseFloat(price),
                createdAt: new Date().toISOString(),
            });
            Alert.alert('Thành công', 'Đã thêm dịch vụ mới!');
            navigation.goBack();
        } catch (error) {
            console.log('Lỗi khi thêm dịch vụ:', error);
            Alert.alert('Lỗi', error.message);
        }
    };

    if (!userLogin || userLogin.role !== 'admin') {
        return null;
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                label="Tên dịch vụ"
                value={serviceName}
                onChangeText={setServiceName}
                style={{ marginBottom: 10 }}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                label="Mô tả"
                value={description}
                onChangeText={setDescription}
                style={{ marginBottom: 10 }}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                label="Giá (VNĐ)"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={{ marginBottom: 20 }}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button mode="contained" onPress={handleAddService}>
                Thêm dịch vụ
            </Button>
        </View>
    );
};

export default AddNewService;