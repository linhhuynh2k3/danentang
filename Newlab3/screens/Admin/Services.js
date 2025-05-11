// screens/Admin/Services.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";

export default function Services({ navigation }) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("SERVICES")
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServices(data);
            });
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.serviceCard}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>{item.price.toLocaleString()} đ</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>HUYỀN TRINH</Text>
                <Icon name="notifications-outline" size={24} color="white" />
            </View>

            {/* Logo */}
            <Image source={require("../../asset/logolab3.png")} style={styles.logo} resizeMode="contain" />

            {/* Danh sách dịch vụ */}
            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>Danh sách dịch vụ</Text>
                <TouchableOpacity onPress={() => navigation.navigate("AddNewService")}>
                    <Icon name="add-circle" size={30} color="#e91e63" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#e91e63",
        padding: 12,
        borderRadius: 8,
    },
    title: { color: "white", fontSize: 18, fontWeight: "bold" },
    logo: { width: "100%", height: 80, marginTop: 16, alignSelf: "center" },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12,
    },
    listTitle: { fontSize: 16, fontWeight: "bold" },
    serviceCard: {
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 16,
        marginVertical: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 1,
    },
    serviceName: { fontSize: 14, fontWeight: "500" },
    servicePrice: { fontSize: 14, color: "#e91e63", fontWeight: "bold" },
});
