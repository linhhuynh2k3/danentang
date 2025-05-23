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
    favorites: [],
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
        case "SET_FAVORITES":
            return { ...state, favorites: action.payload };
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

    // Load danh sách yêu thích
    const loadFavorites = async (uid) => {
        if (!uid) return;

        try {
            const userDoc = await NguoiDung.doc(uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                dispatch({ type: "SET_FAVORITES", payload: userData.favorites || [] });
                return userData.favorites || [];
            }
            dispatch({ type: "SET_FAVORITES", payload: [] });
            return [];
        } catch (error) {
            console.error("Error loading favorites:", error);
            dispatch({ type: "SET_ERROR", payload: error.message });
            return [];
        }
    };

    // Cập nhật danh sách yêu thích
    const toggleFavorite = async (book, currentFavorites) => {
        if (!controller.userLogin || !controller.userLogin.uid) {
            Alert.alert("Thông báo", "Vui lòng đăng nhập để sử dụng tính năng này");
            return;
        }

        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const userRef = NguoiDung.doc(controller.userLogin.uid);
            const userDoc = await userRef.get();
            let favorites = userDoc.exists ? userDoc.data().favorites || [] : [];

            const bookToSave = {
                id: book.id,
                bookName: book.bookName,
                author: book.author,
                bookCover: typeof book.bookCover === "string" ? book.bookCover : book.bookCover?.uri,
                rating: book.rating,
                pageNo: book.pageNo,
                description: book.description,
                language: book.language,
                genre: book.genre,
            };

            if (currentFavorites.some((fav) => fav.id === book.id)) {
                favorites = favorites.filter((fav) => fav.id !== book.id);
                Alert.alert("Thành công", "Đã xóa khỏi danh sách yêu thích");
            } else {
                favorites.push(bookToSave);
                Alert.alert("Thành công", "Đã thêm vào danh sách yêu thích");
            }

            await userRef.set({ favorites }, { merge: true });
            dispatch({ type: "SET_FAVORITES", payload: favorites });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });
            Alert.alert("Lỗi", "Không thể cập nhật danh sách yêu thích");
            console.error("Error toggling favorite:", error);
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };


    return (
        <MyContext.Provider value={[controller, dispatch, { loadBooks, loadCategories, loadFavorites, toggleFavorite }]}>
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
            dispatch({ type: "USER_LOGIN", value: { uid: userDoc.id, ...userData } });
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