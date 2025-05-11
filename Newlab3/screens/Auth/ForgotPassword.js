import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import auth from "@react-native-firebase/auth";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert("Thành công", "Đã gửi email đặt lại mật khẩu");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    }
  };

  return (
    <View>
      <Text>Nhập email để đặt lại mật khẩu</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Button title="Gửi yêu cầu" onPress={handleReset} />
    </View>
  );
}
