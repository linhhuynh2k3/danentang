import React, { useReducer, useContext, createContext } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const MyContext = createContext();

const NguoiDung = firestore().collection("NguoiDung");
const Categories = firestore().collection("Categories");
const Books = firestore().collection("Books");

const initialState = {
    userLogin: null,
    books: [],
    categories: [],
    loading: false,
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userLogin: action.value };
        case "USER_LOGOUT":
            return { ...state, userLogin: null };
        case "SET_BOOKS":
            return { ...state, books: action.payload };
        case "SET_CATEGORIES":
            return { ...state, categories: action.payload };
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

    // Load sách
    const loadBooks = () => {
        dispatch({ type: "SET_LOADING", payload: true });
        Books.get()
            .then(querySnapshot => {
                const data = [];
                querySnapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                dispatch({ type: "SET_BOOKS", payload: data });
            })
            .catch(error => {
                dispatch({ type: "SET_ERROR", payload: error.message });
            })
            .finally(() => {
                dispatch({ type: "SET_LOADING", payload: false });
            });
    };

    // Load danh mục sách
    const loadCategories = () => {
        dispatch({ type: "SET_LOADING", payload: true });
        Categories.get()
            .then(querySnapshot => {
                const data = [];
                querySnapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                dispatch({ type: "SET_CATEGORIES", payload: data });
            })
            .catch(error => {
                dispatch({ type: "SET_ERROR", payload: error.message });
            })
            .finally(() => {
                dispatch({ type: "SET_LOADING", payload: false });
            });
    };

    return (
        <MyContext.Provider value={[controller, dispatch, { loadBooks, loadCategories }]}>
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

export const loginUserInfo = async (dispatch, email) => {
    try {
        const userSnap = await NguoiDung.where("email", "==", email).limit(1).get();

        if (!userSnap.empty) {
            const userDoc = userSnap.docs[0];
            const userData = userDoc.data();
            dispatch({ type: "USER_LOGIN", value: userData });
        } else {
            Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
        }
    } catch (error) {
        Alert.alert("Lỗi", "Không thể lấy thông tin người dùng.");
        console.error("Login error in store.js:", error);
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

export const resetPassword = async (email) => {
    try {
        const userSnap = await firestore()
            .collection("NguoiDung")
            .where("email", "==", email)
            .limit(1)
            .get();

        if (userSnap.empty) {
            Alert.alert("Lỗi", "Email chưa được đăng ký trong hệ thống");
            return;
        }

        await auth().sendPasswordResetEmail(email);
        Alert.alert("Thành công", "Vui lòng kiểm tra email để đặt lại mật khẩu");
    } catch (error) {
        Alert.alert("Lỗi", error.message || "Đã xảy ra lỗi không xác định");
    }
};

export const registerUser = async (email, password) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid;

        await NguoiDung.doc(uid).set({
            email: email,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

        Alert.alert("Thành công", "Tạo tài khoản thành công!");
        return true;
    } catch (e) {
        if (e.code === "auth/email-already-in-use") {
            Alert.alert("Lỗi", "Email đã được sử dụng.");
        } else if (e.code === "auth/invalid-email") {
            Alert.alert("Lỗi", "Email không hợp lệ.");
        } else if (e.code === "auth/weak-password") {
            Alert.alert("Lỗi", "Mật khẩu quá yếu.");
        } else {
            Alert.alert("Lỗi", e.message);
        }
        return false;
    }
};