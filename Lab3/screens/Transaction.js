import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const Transaction = ({ navigation }) => {
    const [controller, dispatch, { loadAppointments }] = useMyContextController(); // Sửa dòng này
    const { appointments, userLogin } = controller;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userLogin?.role === 'admin') {
            loadAppointments(userLogin.email, userLogin.role); // Gọi hàm trực tiếp
        }
        setLoading(false);
    }, [userLogin]);

    const handleAccept = async (appointmentId) => {
        try {
            await firestore().collection('Appointments').doc(appointmentId).update({
                status: 'accepted'
            });
            Alert.alert("Thành công", "Đã chấp nhận lịch hẹn");
        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
    };

    const handleUpdate = (appointment) => {
        navigation.navigate('UpdateAppointment', { appointment });
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="large" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
                QUẢN LÝ LỊCH HẸN
            </Text>
            <FlatList
                data={appointments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card style={{ marginBottom: 10, elevation: 3, borderRadius: 8 }}>
                        <Card.Content>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Dịch vụ: {item.serviceId}
                            </Text>
                            <Text style={{ marginTop: 5 }}>
                                Khách hàng: {item.customerEmail}
                            </Text>
                            <Text style={{ marginTop: 5 }}>
                                Ngày: {item.date.toDate().toLocaleString()}
                            </Text>
                            <Text style={{ marginTop: 5 }}>
                                Trạng thái: {item.status}
                            </Text>
                            {item.note && (
                                <Text style={{ marginTop: 5 }}>Ghi chú: {item.note}</Text>
                            )}
                        </Card.Content>
                        <Card.Actions>
                            {item.status === 'pending' && (
                                <Button onPress={() => handleAccept(item.id)}>
                                    Chấp nhận
                                </Button>
                            )}
                            <Button onPress={() => handleUpdate(item)}>
                                Cập nhật
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        Chưa có lịch hẹn nào
                    </Text>
                }
            />
        </View>
    );
};

export default Transaction;