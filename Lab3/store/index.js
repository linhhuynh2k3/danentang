import React, { useReducer, useContext, createContext } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const MyContext = createContext();
const USERS = firestore().collection("USERS");
const SERVICES = firestore().collection("Services");
const APPOINTMENTS = firestore().collection("Appointments");

const initialState = {
    userLogin: null,
    services: [],
    appointments: [],
    loading: false,
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            console.log('Cập nhật userLogin:', action.payload);
            return { ...state, userLogin: action.value };
        case "SET_USER": // Thêm case này
            return { ...state, userLogin: action.payload };
        case "USER_LOGOUT":
            return { ...state, userLogin: null };
        case "SET_SERVICES":
            return { ...state, services: action.payload };
        case "SET_APPOINTMENTS":
            return { ...state, appointments: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const MyContextControllerProvider = ({ children }) => {
    const [controller, dispatch] = useReducer(reducer, initialState);

    const loadServices = () => {
        dispatch({ type: "SET_LOADING", payload: true });
        SERVICES.get()
            .then(querySnapshot => {
                const services = [];
                querySnapshot.forEach(doc => {
                    services.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                dispatch({ type: "SET_SERVICES", payload: services });
            })
            .catch(error => {
                dispatch({ type: "SET_ERROR", payload: error.message });
            })
            .finally(() => {
                dispatch({ type: "SET_LOADING", payload: false });
            });
    };

    const loadAppointments = (email, role) => {
        dispatch({ type: "SET_LOADING", payload: true });
        let query = APPOINTMENTS;
        if (role === "customer") {
            query = query.where("customerEmail", "==", email);
        }
        query.get()
            .then(querySnapshot => {
                const appointments = [];
                querySnapshot.forEach(doc => {
                    appointments.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                dispatch({ type: "SET_APPOINTMENTS", payload: appointments });
            })
            .catch(error => {
                dispatch({ type: "SET_ERROR", payload: error.message });
            })
            .finally(() => {
                dispatch({ type: "SET_LOADING", payload: false });
            });
    };

    return (
        <MyContext.Provider value={[controller, dispatch, { loadServices, loadAppointments }]}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContextController = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContextController must be used within a MyContextControllerProvider");
    }
    return context;
};

export const login = async (dispatch, email, password) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const userEmail = userCredential.user.email;

        const userDoc = await USERS.doc(userEmail).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            dispatch({ type: "USER_LOGIN", value: userData });
        }
    } catch (error) {
        Alert.alert("Đăng nhập thất bại", error.message);
    }
};

export const logout = async (dispatch) => {
    try {
        await auth().signOut();
        dispatch({ type: "USER_LOGOUT" });
    } catch (error) {
        console.error("Lỗi đăng xuất:", error);
    }
};

export const resetPassword = (email) => {
    return auth().sendPasswordResetEmail(email)
        .then(() => Alert.alert("Thành công", "Vui lòng kiểm tra email"))
        .catch(error => Alert.alert("Lỗi", error.message));
};

export const updateProfile = async (email, data) => {
    try {
        await USERS.doc(email).update(data);
        Alert.alert("Thành công", "Cập nhật thông tin thành công");
    } catch (error) {
        Alert.alert("Lỗi", error.message);
    }
};

export const changePassword = async (currentPassword, newPassword) => {
    try {
        const user = auth().currentUser;
        if (!user) {
            throw new Error('Không tìm thấy người dùng hiện tại');
        }
        const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(newPassword);
        Alert.alert("Thành công", "Đổi mật khẩu thành công");
    } catch (error) {
        console.log('Lỗi đổi mật khẩu:', error.message); // Log lỗi để debug
        Alert.alert("Lỗi", error.message || 'Đã xảy ra lỗi khi đổi mật khẩu');
    }
};