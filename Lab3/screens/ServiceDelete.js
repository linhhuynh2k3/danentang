import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const ServiceDelete = ({ route, navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { service } = route.params; // Nhận service từ navigation params
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);

    const hideDialog = () => {
        setVisible(false);
        navigation.goBack();
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await firestore()
                .collection('Services')
                .doc(service.id)
                .delete();

            Alert.alert("Thành công", "Đã xóa dịch vụ thành công");
            navigation.navigate('Services'); // Quay lại màn hình danh sách
        } catch (error) {
            Alert.alert("Lỗi", "Xóa dịch vụ thất bại: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Xác nhận xóa</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Bạn chắc chắn muốn xóa dịch vụ "{service.name}"?
                        </Text>
                        <Text style={{ color: 'red', marginTop: 10 }}>
                            Hành động này không thể hoàn tác!
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={hideDialog}
                            disabled={loading}
                        >
                            Hủy
                        </Button>
                        <Button
                            mode="contained"
                            buttonColor="red"
                            onPress={handleDelete}
                            loading={loading}
                        >
                            Xóa
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default ServiceDelete;