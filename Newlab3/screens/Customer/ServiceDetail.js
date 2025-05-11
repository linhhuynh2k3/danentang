import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    Alert,
    TouchableOpacity,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function ServiceDetail({ route, navigation }) {
    const { service } = route.params;
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");

    const handleAppointment = async () => {
        const user = auth().currentUser;

        if (!user) {
            Alert.alert("Lỗi", "Bạn cần đăng nhập để đặt lịch.");
            return;
        }

        if (!date) {
            Alert.alert("Lỗi", "Vui lòng nhập ngày hẹn.");
            return;
        }

        try {
            await firestore().collection("APPOINTMENTS").add({
                userId: user.uid,
                serviceId: service.id,
                serviceName: service.name,
                price: service.price,
                date: date,
                note: note,
                status: "pending",
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

            Alert.alert("Thành công", "Đặt lịch thành công!");
            navigation.goBack();
        } catch (error) {
            console.error("Đặt lịch thất bại: ", error);
            Alert.alert("Lỗi", "Không thể đặt lịch. Vui lòng thử lại.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{service.name}</Text>
            <Text style={styles.price}>{service.price?.toLocaleString()} đ</Text>
            <Text style={styles.label}>Ngày hẹn (dd/mm/yyyy):</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập ngày"
                value={date}
                onChangeText={setDate}
            />
            <Text style={styles.label}>Ghi chú (nếu có):</Text>
            <TextInput
                style={styles.input}
                placeholder="Ghi chú"
                value={note}
                onChangeText={setNote}
            />
            <TouchableOpacity style={styles.button} onPress={handleAppointment}>
                <Text style={styles.buttonText}>Đặt lịch hẹn</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    name: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    price: { fontSize: 18, color: "#888", marginBottom: 20 },
    label: { marginTop: 10, marginBottom: 4, fontWeight: "600" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#e91e63",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
