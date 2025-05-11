import { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ServiceDetail = ({ route, navigation }) => {
    const { service } = route.params;
    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(String(service.price));
    const [description, setDescription] = useState(service.description);

    const handleUpdate = async () => {
        try {
            await firestore()
                .collection('Services')
                .doc(service.id)
                .update({
                    name,
                    price: parseInt(price),
                    description
                });
            Alert.alert("Thành công", "Cập nhật dịch vụ thành công");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                label="Tên dịch vụ"
                value={name}
                onChangeText={setName}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Giá dịch vụ"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Mô tả"
                value={description}
                onChangeText={setDescription}
                multiline
                style={{ marginBottom: 20 }}
            />
            <Button
                mode="contained"
                onPress={handleUpdate}
                style={{ marginBottom: 10 }}
            >
                Cập nhật
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
            >
                Hủy
            </Button>
            <Button
                mode="contained"
                buttonColor="red"
                onPress={() => navigation.navigate('ServiceDelete', { service })}
                style={{ marginTop: 10 }}
            >
                Xóa dịch vụ
            </Button>
        </View>
    );
};

export default ServiceDetail;