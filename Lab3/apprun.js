import { MyContextControllerProvider } from "./store/index";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./routers/Router";
import { LogBox } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';

const Apprun = () => {
    const USERS = firestore().collection("USERS");

    const admin = {
        fullName: "Admin",
        email: "linhhuynh24072003@gmail.com",
        password: "123456",
        phone: "0913131732",
        address: "Bình Dương",
        role: "admin"
    };

    useEffect(() => {
        LogBox.ignoreLogs(['AsyncStorage has been extracted']);
    }, []);

    useEffect(() => {
        const checkAndCreateAdmin = async () => {
            try {
                const doc = await USERS.doc(admin.email).get();
                if (!doc.exists) {
                    try {
                        await auth().createUserWithEmailAndPassword(admin.email, admin.password);

                        // Không lưu mật khẩu vào Firestore
                        const { password, ...adminData } = admin;
                        await USERS.doc(admin.email).set(adminData);

                        console.log("✅ Admin account created.");
                    } catch (authError) {
                        console.log("❌ Firebase Auth error:", authError.message);
                    }
                } else {
                    console.log("ℹ️ Admin already exists in Firestore.");
                }
            } catch (err) {
                console.log("❌ Error checking admin in Firestore:", err.message);
            }
        };

        checkAndCreateAdmin();
    }, []);

    return (
        <PaperProvider>
            <MyContextControllerProvider>
                <NavigationContainer>
                    <Router />
                </NavigationContainer>
            </MyContextControllerProvider>
        </PaperProvider>
    );
};

export default Apprun;
