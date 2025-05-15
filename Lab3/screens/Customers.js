import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const Customers = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscriber = firestore()
            .collection('USERS')
            .where('role', '==', 'customer')
            .onSnapshot(
                querySnapshot => {
                    const customerList = [];
                    querySnapshot.forEach(doc => {
                        customerList.push({
                            email: doc.id,
                            ...doc.data()
                        });
                    });
                    setCustomers(customerList);
                    setLoading(false);
                },
                error => {
                    Alert.alert("Lỗi", error.message);
                    setLoading(false);
                }
            );
        return () => subscriber();
    }, []);

    const handleUpdate = (customer) => {
        navigation.navigate('UpdateCustomer', { customer });
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
                QUẢN LÝ KHÁCH HÀNG
            </Text>
            <FlatList
                data={customers}
                keyExtractor={item => item.email}
                renderItem={({ item }) => (
                    <Card style={{ marginBottom: 10, elevation: 3, borderRadius: 8 }}>
                        <Card.Content>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                {item.fullName}
                            </Text>
                            <Text style={{ marginTop: 5 }}>Email: {item.email}</Text>
                            <Text style={{ marginTop: 5 }}>SĐT: {item.phone}</Text>
                            <Text style={{ marginTop: 5 }}>Địa chỉ: {item.address}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => handleUpdate(item)}>
                                Cập nhật
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        Chưa có khách hàng nào
                    </Text>
                }
            />
        </View>
    );
};

export default Customers;