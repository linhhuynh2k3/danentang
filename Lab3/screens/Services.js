import { View, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Card, Text, IconButton, TextInput } from 'react-native-paper';
import { useMyContextController } from '../store';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const Services = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { services, userLogin } = controller;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredServices, setFilteredServices] = useState(services);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Services')
            .onSnapshot(
                querySnapshot => {
                    const services = [];
                    querySnapshot.forEach(doc => {
                        services.push({
                            id: doc.id,
                            name: doc.data().name || 'Không có tên',
                            price: doc.data().price || 0,
                            description: doc.data().description
                        });
                    });
                    dispatch({ type: 'SET_SERVICES', payload: services });
                    setFilteredServices(services);
                    setLoading(false);
                },
                error => {
                    console.error("Lỗi realtime listener:", error);
                    setError(error.message);
                    setLoading(false);
                }
            );

        return () => subscriber();
    }, []);

    useEffect(() => {
        setFilteredServices(
            services.filter(service =>
                service.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, services]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
                <Button onPress={() => setLoading(true)}>Thử lại</Button>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15
            }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>DANH SÁCH DỊCH VỤ</Text>
                {userLogin?.role === 'admin' && (
                    <IconButton
                        icon="plus"
                        size={24}
                        onPress={() => navigation.navigate('AddNewService')}
                    />
                )}
            </View>
            <TextInput
                label="Tìm kiếm dịch vụ"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ marginBottom: 10 }}
            />
            <FlatList
                data={filteredServices}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card
                        style={{
                            marginBottom: 10,
                            elevation: 3,
                            borderRadius: 8
                        }}
                        onPress={() => navigation.navigate('ServiceDetail', { service: item })}
                    >
                        <Card.Content>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                            <Text style={{ color: 'red', marginTop: 5 }}>
                                {item.price.toLocaleString('vi-VN')} đ
                            </Text>
                            {item.description && (
                                <Text style={{ marginTop: 5 }}>{item.description}</Text>
                            )}
                        </Card.Content>
                    </Card>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        Chưa có dịch vụ nào
                    </Text>
                }
            />
        </View>
    );
};

export default Services;