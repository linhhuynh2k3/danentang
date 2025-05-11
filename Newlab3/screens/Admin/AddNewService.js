import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

export default function AddNewService({ navigation }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");

    const handleAdd = async () => {
        if (!name || !price || !duration) {
            Alert.alert("Thiếu thông tin");
            return;
        }

        await firestore().collection("SERVICES").add({
            name,
            description,
            price: parseInt(price),
            duration,
        });

        Alert.alert("Thêm thành công");
        navigation.goBack();
    };

    return (
        <View>
            <TextInput placeholder="Tên dịch vụ" value={name} onChangeText={setName} />
            <TextInput placeholder="Mô tả" value={description} onChangeText={setDescription} />
            <TextInput placeholder="Giá" value={price} onChangeText={setPrice} keyboardType="numeric" />
            <TextInput placeholder="Thời gian (ví dụ: 60 phút)" value={duration} onChangeText={setDuration} />
            <Button title="Thêm" onPress={handleAdd} />
        </View>
    );
}
