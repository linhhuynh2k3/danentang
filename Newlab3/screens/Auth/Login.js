import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const userDoc = await firestore().collection("USERS").doc(email).get();

      if (userDoc.exists) {
        const role = userDoc.data().role;
        if (role === "admin") {
          navigation.navigate("Admin");
        } else {
          navigation.navigate("Customer");
        }
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đăng nhập thất bại: " + error.message);
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate("Register")}>Chưa có tài khoản?</Text>
      <Text onPress={() => navigation.navigate("ForgotPassword")}>Quên mật khẩu?</Text>
    </View>
  );
}
