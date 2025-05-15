import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Text, IconButton } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from "../store";

const DanhSachMonAn = ({ route }) => {
    const { loaiMonId, tenLoai } = route.params;
    const [monAnList, setMonAnList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [controller, dispatch] = useMyContextController();

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("MonAn")
            .where("loaiMonAnId", "==", loaiMonId) // filter món theo loại món
            .onSnapshot(snapshot => {
                const dsMon = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMonAnList(dsMon);
                setLoading(false);
            }, error => {
                console.error("Lỗi lấy MonAn:", error);
                setLoading(false);
            });

        return () => unsubscribe();
    }, [loaiMonId]);

    if (loading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" /></View>
    }

    const addToCart = (monAn) => {
        dispatch({ type: "ADD_TO_CART", payload: monAn });
        alert(`Đã thêm ${monAn.tenMon} vào giỏ hàng`);
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>{tenLoai}</Text>
            <FlatList
                data={monAnList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.monItem}>
                        <Image source={{ uri: item.hinh }} style={styles.monImage} />
                        <View style={{ flex: 1, marginLeft: 10, justifyContent: "center" }}>
                            <Text style={{ fontSize: 18 }}>{item.tenMon}</Text>
                            <Text style={{ color: "green", marginTop: 4 }}>{item.gia.toLocaleString()} VNĐ</Text>
                        </View>
                        <IconButton icon="cart-plus" size={28} onPress={() => addToCart(item)} />
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#ccc", marginVertical: 6 }} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    monItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
    },
    monImage: {
        width: 80,
        height: 60,
        borderRadius: 6,
    },
});

export default DanhSachMonAn;
