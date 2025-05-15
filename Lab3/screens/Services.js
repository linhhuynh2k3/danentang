import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { getFirestore, collection, onSnapshot } from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const db = getFirestore();

const Services = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [state] = useMyContextController(); // Sửa từ controller thành state
    const { userLogin } = state; // Sửa từ controller thành state

    console.log('userLogin trong Services:', userLogin);
    console.log('userLogin.role:', userLogin?.role);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Services'), (snapshot) => {
            const serviceList = [];
            snapshot.forEach(doc => {
                serviceList.push({ id: doc.id, ...doc.data() });
            });
            setServices(serviceList);
            setLoading(false);
        }, (error) => {
            console.log('Lỗi khi lấy danh sách dịch vụ:', error);
            Alert.alert('Lỗi', error.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDetail = (service) => {
        console.log('Service được truyền:', service); // Thêm log để kiểm tra
        navigation.navigate('ServiceDetail', { service });
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Đang tải...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
                DANH SÁCH DỊCH VỤ
            </Text>
            <FlatList
                data={services}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card style={{ marginBottom: 10, elevation: 3, borderRadius: 8 }}>
                        <Card.Content>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                {item.name}
                            </Text>
                            <Text style={{ marginTop: 5 }}>Mô tả: {item.description}</Text>
                            <Text style={{ marginTop: 5 }}>Giá: {item.price} VNĐ</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => handleDetail(item)}>
                                Chi tiết
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        Chưa có dịch vụ nào
                    </Text>
                }
            />
            {userLogin && userLogin.role === 'admin' && (
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('AddNewService')}
                    style={{ marginTop: 10 }}
                >
                    Thêm dịch vụ mới
                </Button>
            )}
        </View>
    );
};

export default Services;