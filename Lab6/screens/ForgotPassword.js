import { View, Alert } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { resetPassword, useMyContextController } from "../store";
import { useState } from "react";

const ForgotPassword = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const hasErrorEmail = () => !email || !email.includes("@");

    const handleResetPassword = () => {
        setSubmitted(true);

        if (hasErrorEmail()) {
            Alert.alert("Lỗi", "Email không hợp lệ");
            return;
        }

        setLoading(true);
        resetPassword(email)
            .finally(() => setLoading(false));
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                alignSelf: "center",
                color: "blue",
                marginTop: 80,
                marginBottom: 30
            }}>
                Quên mật khẩu
            </Text>

            <TextInput
                label={"Địa chỉ Email đã đăng ký"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ marginBottom: 10 }}
            />
            <HelperText type="error" visible={submitted && hasErrorEmail()}>
                Địa chỉ Email không hợp lệ
            </HelperText>

            <Button
                mode="contained"
                buttonColor='blue'
                onPress={handleResetPassword}
                loading={loading}
                disabled={loading}
                style={{ marginTop: 20 }}
            >
                Gửi liên kết đặt lại
            </Button>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                <Button onPress={() => navigation.navigate("Login")}>
                    Quay lại đăng nhập
                </Button>
            </View>
        </View>
    );
};

export default ForgotPassword;
