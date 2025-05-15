import { MyContextControllerProvider } from "./store/index";
import { doc, getFirestore, getDoc, setDoc } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./routers/Router";
import { LogBox } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';

// ✅ Khai báo database Firestore
const db = getFirestore();

const Apprun = () => {
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
        const checkAndCreateAdmin = async (retryCount = 0) => {
            try {
                const docRef = doc(db, "USERS", admin.email); // ✅ Sử dụng biến admin đúng vị trí
                const snapshot = await getDoc(docRef);
                if (!snapshot.exists()) {
                    await auth().createUserWithEmailAndPassword(admin.email, admin.password);
                    const { password, ...adminData } = admin;
                    await setDoc(docRef, adminData);
                    console.log("✅ Admin account created.");
                } else {
                    console.log("ℹ️ Admin already exists in Firestore.");
                }
            } catch (err) {
                console.log(`❌ Firestore error at retry ${retryCount + 1}:`, err.message);
                if (retryCount < 3) {
                    const delay = 1000 * Math.pow(2, retryCount);
                    setTimeout(() => checkAndCreateAdmin(retryCount + 1), delay);
                } else {
                    console.log("❌ Max retries reached.");
                }
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
