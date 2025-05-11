import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

export default function ServiceDetail({ route, navigation }) {
    const { service } = route.params;

    const [name, setName] = useState(service.name);
    const [description, setDescription] = useState(service.description);
    const [price, setPrice] = useState(service.price.toString());
    const [duration, setDuration] = useState(service.duration);

    const handleUpdate = async () => {
        await firestore().collection("SERVICES").doc(service.id).update({
            name,
            description,
            price: parseInt(price),
            duration,
        });

        Alert.alert("Cập nhật thành công");
        navigation.goBack();
    };

    return (
        <View>
            <TextInput value={name} onChangeText={setName} />
            <TextInput value={description} onChangeText={setDescription} />
            <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" />
            <TextInput value={duration} onChangeText={setDuration} />
            <Button title="Cập nhật" onPress={handleUpdate} />
        </View>
    );
}
