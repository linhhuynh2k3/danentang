import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const AddNewService = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [controller, dispatch] = useMyContextController();

    const handleAddService = async () => {
        await firestore().collection('Services').add({
            name,
            price: parseInt(price),
            description,
            createdAt: firestore.FieldValue.serverTimestamp()
        });
        navigation.goBack();
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
                onPress={handleAddService}
            >
                Thêm dịch vụ
            </Button>
        </View>
    );
};

export default AddNewService;