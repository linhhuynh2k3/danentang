import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { logout, useMyContextController } from "../store/index";
import { useEffect } from "react";

const Setting = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    const handleLogout = async () => {
        try {
            await logout(dispatch);
            // Navigation sẽ được xử lý trong useEffect khi userLogin thay đổi
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userLogin == null) {
            navigation.navigate("Login");
        }
    }, [userLogin, navigation]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button mode="contained" onPress={handleLogout}>
                Logout
            </Button>
        </View>
    );
};

export default Setting;
