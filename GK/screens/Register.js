import { Alert, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { registerUser } from "../store"; // ⬅️ import hàm mới

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const hasErrorEmail = () => !email || !/\S+@\S+\.\S+/.test(email);
    const hasErrorPassword = () => !password || password.length < 6;
    const hasErrorPasswordConfirm = () => passwordConfirm !== password;

    const handleCreateAccount = async () => {
        setSubmitted(true);

        if (hasErrorEmail() || hasErrorPassword() || hasErrorPasswordConfirm()) {
            Alert.alert("Thông báo", "Vui lòng kiểm tra lại thông tin.");
            return;
        }

        const success = await registerUser(email, password);
        if (success) navigation.navigate("Login");
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{
                fontSize: 30,
                fontWeight: "bold",
                alignSelf: "center",
                color: "pink",
                marginTop: 50,
                marginBottom: 50,
            }}>
                Đăng ký tài khoản
            </Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <HelperText type="error" visible={submitted && hasErrorEmail()}>
                Địa chỉ email không hợp lệ
            </HelperText>

            <TextInput
                label="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
            />
            <HelperText type="error" visible={submitted && hasErrorPassword()}>
                Mật khẩu phải ít nhất 6 ký tự
            </HelperText>

            <TextInput
                label="Xác nhận mật khẩu"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry={hiddenPasswordConfirm}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)} />}
            />
            <HelperText type="error" visible={submitted && hasErrorPasswordConfirm()}>
                Mật khẩu xác nhận không khớp
            </HelperText>

            <Button mode="contained" onPress={handleCreateAccount} style={{ marginTop: 10 }}>
                Tạo tài khoản
            </Button>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <Text>Bạn đã có tài khoản?</Text>
                <Button onPress={() => navigation.navigate("Login")}>
                    Đăng nhập
                </Button>
            </View>
        </View>
    );
};

export default Register;
