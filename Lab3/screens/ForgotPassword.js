import { View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { resetPassword, useMyContextController } from "../store";
import { useState } from "react";
import { Alert } from "react-native";

const ForgotPassword = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const hasErrorEmail = () => !email.includes("@");

    const handleResetPassword = () => {
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
            }}>Quên mật khẩu</Text>

            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 10 }}
            />
            <HelperText type="error" visible={hasErrorEmail()}>
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