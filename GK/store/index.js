import React, { useReducer, useContext, createContext } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const MyContext = createContext();

const NguoiDung = firestore().collection("NguoiDung");
const LoaiMonAn = firestore().collection("LoaiMonAn");
const MonAn = firestore().collection("MonAn");

const initialState = {
    userLogin: null,
    monan: [],
    loaimonan: [],
    loading: false,
    error: null,
    cart: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userLogin: action.value };
        case "USER_LOGOUT":
            return { ...state, userLogin: null };
        case "SET_MONAN":
            return { ...state, monan: action.payload };
        case "SET_LOAIMONAN":
            return { ...state, loaimonan: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "ADD_TO_CART":
            // Kiểm tra món đã có trong cart chưa
            const existingIndex = state.cart.findIndex(item => item.id === action.payload.id);
            if (existingIndex >= 0) {
                // Nếu có rồi thì tăng số lượng
                const newCart = [...state.cart];
                newCart[existingIndex].quantity += 1;
                return { ...state, cart: newCart };
            } else {
                // Nếu chưa có thì thêm món mới với quantity = 1
                return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
            }
        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };
        case "CLEAR_CART":
            return { ...state, cart: [] };
        case "UPDATE_CART_QUANTITY":
            const updatedCart = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, quantity: action.payload.quantity };
                }
                return item;
            }).filter(item => item.quantity > 0); // loại bỏ món nếu quantity <= 0
            return { ...state, cart: updatedCart };
        default:
            return state;
    }
};

export const MyContextControllerProvider = ({ children }) => {
    const [controller, dispatch] = useReducer(reducer, initialState);

    // Load món ăn
    const loadMonAn = () => {
        dispatch({ type: "SET_LOADING", payload: true });
        MonAn.get()
            .then(querySnapshot => {
                const data = [];
                querySnapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                dispatch({ type: "SET_MONAN", payload: data });
            })
            .catch(error => {
                dispatch({ type: "SET_ERROR", payload: error.message });
            })
            .finally(() => {
                dispatch({ type: "SET_LOADING", payload: false });
            });
    };

    // Load loại món ăn
    const loadLoaiMonAn = () => {
        dispatch({ type: "SET_LOADING", payload: true });
        LoaiMonAn.get()
            .then(querySnapshot => {
                const data = [];
                querySnapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                dispatch({ type: "SET_LOAIMONAN", payload: data });
            })
            .catch(error => {
                dispatch({ type: "SET_ERROR", payload: error.message });
            })
            .finally(() => {
                dispatch({ type: "SET_LOADING", payload: false });
            });
    };

    return (
        <MyContext.Provider value={[controller, dispatch, { loadMonAn, loadLoaiMonAn }]}>
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
// Đăng xuất
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
        // 1. Tạo tài khoản Firebase Authentication
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid;

        // 2. Lưu thông tin cơ bản vào Firestore
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
