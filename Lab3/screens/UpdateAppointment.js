import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const UpdateAppointment = ({ route, navigation }) => {
    const { appointment } = route.params;
    const [date, setDate] = useState(appointment.date.toDate().toISOString().split('T')[0]);
    const [note, setNote] = useState(appointment.note || '');
    const [status, setStatus] = useState(appointment.status);

    const handleUpdate = async () => {
        try {
            await firestore().collection('Appointments').doc(appointment.id).update({
                date: firestore.Timestamp.fromDate(new Date(date)),
                note,
                status
            });
            Alert.alert("Thành công", "Cập nhật lịch hẹn thành công");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                label="Ngày hẹn (YYYY-MM-DD)"
                value={date}
                onChangeText={setDate}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Ghi chú"
                value={note}
                onChangeText={setNote}
                multiline
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Trạng thái"
                value={status}
                onChangeText={setStatus}
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

export default UpdateAppointment;