import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useMyContextController } from '../store';
import { IconButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Cart = () => {
    const [controller, dispatch] = useMyContextController();
    const { cart } = controller;

    const increaseQuantity = (item) => {
        dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } });
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } });
        }
    };

    const removeItem = (item) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
    };

    const resetCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const handleCheckout = () => {
        Alert.alert(
            "Thanh toán thành công",
            "Đơn hàng của bạn đã được xử lý",
            [
                {
                    text: "OK",
                    onPress: () => resetCart()
                }
            ]
        );
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.gia * item.quantity, 0);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {cart.length === 0 ? (
                <Text>Giỏ hàng trống</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Text style={{ flex: 1 }}>{item.tenMon}</Text>
                                <Text>{item.gia.toLocaleString()} VNĐ</Text>
                                <View style={styles.quantityControl}>
                                    <TouchableOpacity onPress={() => decreaseQuantity(item)} style={styles.qtyBtn}>
                                        <Text style={styles.qtyText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{ marginHorizontal: 8 }}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => increaseQuantity(item)} style={styles.qtyBtn}>
                                        <Text style={styles.qtyText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <IconButton icon="delete" size={24} onPress={() => removeItem(item)} />
                            </View>
                        )}
                        ListFooterComponent={() => (
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Tổng cộng: {totalPrice.toLocaleString()} VNĐ</Text>
                                <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
                                    <Text style={styles.checkoutText}>Thanh toán</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
    },
    qtyBtn: {
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    qtyText: {
        fontSize: 18,
    },
    checkoutBtn: {
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        borderRadius: 6,
    },
    checkoutText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    }
});

export default Cart;