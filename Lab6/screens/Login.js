import { View, Alert } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useMyContextController, loginUserInfo } from "../store";
import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Login = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller; // Lấy thông tin người dùng đã đăng nhập từ context

    const [email, setEmail] = useState(""); // Trạng thái lưu email
    const [password, setPassword] = useState(""); // Trạng thái lưu mật khẩu
    const [hiddenPassword, setHiddenPassword] = useState(true); // Trạng thái ẩn/hiện mật khẩu

    // Hàm kiểm tra định dạng email
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleLogin = async () => {
        // Bước 1: Kiểm tra xem đã nhập đầy đủ thông tin chưa
        if (!email || !password) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ email và mật khẩu.");
            return;
        }

        // Bước 2: Kiểm tra định dạng email hợp lệ
        if (!validateEmail(email)) {
            Alert.alert("Thông báo", "Email không hợp lệ.");
            return;
        }

        try {
            // Bước 3: Kiểm tra email có tồn tại trong Firestore trong bảng NguoiDung
            const userSnap = await firestore()
                .collection("NguoiDung")
                .where("email", "==", email)
                .limit(1)
                .get();

            if (userSnap.empty) {
                Alert.alert("Thông báo", "Email chưa được đăng ký.");
                return;
            }

            // Bước 4: Thực hiện đăng nhập bằng Firebase Auth
            try {
                await auth().signInWithEmailAndPassword(email, password);
                // Nếu đăng nhập thành công, lưu thông tin người dùng vào context
                await loginUserInfo(dispatch, email);
            } catch (error) {
                if (error.code === "auth/wrong-password") {
                    Alert.alert("Thông báo", "Sai mật khẩu. Vui lòng thử lại.");
                } else {
                    Alert.alert("Lỗi", error.message);
                }
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể kiểm tra tài khoản. Vui lòng thử lại sau.");
            console.error("Lỗi Firestore:", error);
        }
    };

    useEffect(() => {
        // Điều hướng đến màn hình Home nếu người dùng đã đăng nhập
        if (userLogin) {
            navigation.navigate("Home");
        }
    }, [userLogin]);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                alignSelf: "center",
                color: "blue",
                marginTop: 80,
                marginBottom: 30
            }}>Đăng nhập</Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                label="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
            />

            <Button
                mode="contained"
                buttonColor="blue"
                onPress={handleLogin}
                style={{ marginTop: 20 }}
            >
                Đăng nhập
            </Button>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                <Text>Bạn chưa có tài khoản?</Text>
                <Button onPress={() => navigation.navigate("Register")}>
                    Tạo tài khoản mới
                </Button>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button onPress={() => navigation.navigate("ForgotPassword")}>
                    Quên mật khẩu?
                </Button>
            </View>
        </View>
    );
};

export default Login;