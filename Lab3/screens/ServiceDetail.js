import React, { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const ServiceDetail = ({ route, navigation }) => {
    const { service } = route.params || {};
    const [state] = useMyContextController(); // Sửa từ controller thành state
    const { userLogin } = state;

    const [name, setName] = useState(service?.name || '');
    const [description, setDescription] = useState(service?.description || '');
    const [price, setPrice] = useState(service?.price ? service.price.toString() : '');
    const [appointmentDate, setAppointmentDate] = useState('');

    console.log('Service trong ServiceDetail:', service);
    console.log('userLogin trong ServiceDetail:', userLogin);
    console.log('userLogin.role:', userLogin?.role);

    const handleUpdate = async () => {
        if (!name || !description || !price) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        try {
            await firestore().collection('Services').doc(service.id).update({
                name,
                description,
                price: parseFloat(price),
            });
            Alert.alert('Thành công', 'Cập nhật dịch vụ thành công');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Lỗi', error.message);
        }
    };

    const handleDelete = () => {
        navigation.navigate('ServiceDelete', { serviceId: service.id });
    };

    const handleBookAppointment = async () => {
        if (!appointmentDate) {
            Alert.alert('Lỗi', 'Vui lòng chọn ngày hẹn');
            return;
        }
        try {
            await firestore().collection('Appointments').add({
                serviceId: service.id,
                customerEmail: userLogin.email,
                date: new Date(appointmentDate),
                status: 'pending',
                note: '',
            });
            Alert.alert('Thành công', 'Đặt lịch hẹn thành công');
            setAppointmentDate('');
        } catch (error) {
            Alert.alert('Lỗi', error.message);
        }
    };

    if (!service) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Lỗi: Không tìm thấy thông tin dịch vụ</Text>
                <Button mode="contained" onPress={() => navigation.goBack()}>
                    Quay lại
                </Button>
            </View>
        );
    }

    return (
        <ScrollView style={{ padding: 10 }}>
            <Card style={{ marginBottom: 20, elevation: 3, borderRadius: 8 }}>
                <Card.Content>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                        CHI TIẾT DỊCH VỤ
                    </Text>
                    <TextInput
                        label="Tên dịch vụ"
                        value={name}
                        onChangeText={setName}
                        style={{ marginBottom: 10 }}
                        disabled={userLogin?.role !== 'admin'}
                    />
                    <TextInput
                        label="Mô tả"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        style={{ marginBottom: 10 }}
                        disabled={userLogin?.role !== 'admin'}
                    />
                    <TextInput
                        label="Giá"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        style={{ marginBottom: 10 }}
                        disabled={userLogin?.role !== 'admin'}
                    />
                </Card.Content>
            </Card>

            {userLogin && userLogin.role === 'admin' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button mode="contained" onPress={handleUpdate}>
                        Cập nhật
                    </Button>
                    <Button mode="contained" onPress={handleDelete} buttonColor="red">
                        Xóa
                    </Button>
                </View>
            )}

            {userLogin && userLogin.role === 'customer' && (
                <>
                    <TextInput
                        label="Ngày hẹn (YYYY-MM-DD)"
                        value={appointmentDate}
                        onChangeText={setAppointmentDate}
                        style={{ marginBottom: 10 }}
                    />
                    <Button
                        mode="contained"
                        onPress={handleBookAppointment}
                        style={{ marginTop: 10 }}
                    >
                        Đặt lịch hẹn
                    </Button>
                </>
            )}
        </ScrollView>
    );
};

export default ServiceDetail;