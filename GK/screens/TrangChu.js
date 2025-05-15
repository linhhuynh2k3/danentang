import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Text as RNText } from "react-native"; import { Text, IconButton } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import { logout, useMyContextController } from "../store";

const TrangChu = ({ navigation }) => {

    const [loaiMonAn, setLoaiMonAn] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy cart từ context
    const [controller, dispatch] = useMyContextController();
    const { cart } = controller;

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("LoaiMonAn")
            .onSnapshot(snapshot => {
                const dsLoai = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setLoaiMonAn(dsLoai);
                setLoading(false);
            }, error => {
                console.error("Lỗi lấy LoaiMonAn:", error);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);

    // Tính tổng số lượng sản phẩm trong giỏ
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "🍽️ Nhà hàng",
            headerRight: () => (
                <View style={{ flexDirection: "row", gap: 10, paddingRight: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={{ padding: 5 }}>
                        <IconButton icon="cart" size={24} />
                        {cartQuantity > 0 && (
                            <View style={styles.badge}>
                                <RNText style={styles.badgeText}>{cartQuantity}</RNText>
                            </View>
                        )}
                    </TouchableOpacity>

                    <IconButton
                        icon="logout"
                        size={24}
                        onPress={async () => {
                            await logout(dispatch); // Use dispatch from context
                            // Optional: Navigate to Login screen after logout
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "Login" }],
                                })
                            );
                        }}
                    />
                </View>
            ),
        });
    }, [navigation, cartQuantity]);

    if (loading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" /></View>
    }
    const hinhLoaiMap = {
        "Việt Nam": require("../assets/vietnam.png"),
        "Trung Quốc": "https://cdn-icons-png.flaticon.com/512/197/197375.png",
        "Hàn Quốc": "https://cdn-icons-png.flaticon.com/512/197/197582.png",
        "Nhật Bản": "https://cdn-icons-png.flaticon.com/512/197/197604.png",
        "Thái Lan": "https://cdn-icons-png.flaticon.com/512/197/197560.png",
        "Ý": "https://cdn-icons-png.flaticon.com/512/197/197626.png",
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("DanhSachMonAn", { loaiMonId: item.id, tenLoai: item.tenLoai })}
        >
            <Image
                source={
                    hinhLoaiMap[item.tenLoai]
                        ? (typeof hinhLoaiMap[item.tenLoai] === 'number'
                            ? hinhLoaiMap[item.tenLoai]
                            : { uri: hinhLoaiMap[item.tenLoai] }
                        )
                        : require("../assets/default.png") // ảnh mặc định local nếu không có
                }
                style={styles.menuImage}
            />
            <Text style={styles.menuText}>{item.tenLoai}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={loaiMonAn}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ justifyContent: "center" }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: 0,
        top: 2,
        backgroundColor: 'red',
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    menuItem: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 10,
        backgroundColor: "white",
    },
    menuImage: {
        width: 120,
        height: 90,
        borderRadius: 10,
    },
    menuText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default TrangChu;
