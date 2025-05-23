import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { useMyContextController, logout } from '../store';
import { Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import '../firebaseConfig';

const firestore = firebase.firestore();

const Setting = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userLogin || !userLogin.uid) {
                setLoading(false);
                return;
            }

            try {
                const userDoc = await firestore()
                    .collection('NguoiDung')
                    .doc(userLogin.uid)
                    .get();

                if (userDoc.exists) {
                    const userData = userDoc.data();
                    setFavorites(userData.favorites || []);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [userLogin]);


    const handleLogout = async () => {
        try {
            await logout(dispatch);
            Alert.alert('Thành công', 'Bạn đã đăng xuất.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
            console.error('Logout error:', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                padding: SIZES.padding,
                marginVertical: SIZES.base,
                backgroundColor: COLORS.secondary,
                borderRadius: SIZES.radius,
            }}
            onPress={() =>
                navigation.navigate('BookDetail', {
                    book: item,
                })
            }
        >
            <Image
                source={{ uri: item.bookCover }}
                resizeMode='cover'
                style={{ width: 100, height: 150, borderRadius: 10 }}
            />
            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <View style={{ padding: SIZES.padding }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.white }}>Cài đặt</Text>
                    {userLogin && (
                        <Button
                            mode='contained'
                            buttonColor={COLORS.primary}
                            onPress={handleLogout}
                            style={{ paddingHorizontal: SIZES.base }}
                        >
                            Đăng xuất
                        </Button>
                    )}
                </View>
                <Text style={{ ...FONTS.h3, color: COLORS.white, marginTop: SIZES.padding }}>
                    Sách yêu thích
                </Text>
                {userLogin ? (
                    favorites.length > 0 ? (
                        <FlatList
                            data={favorites}
                            renderItem={renderItem}
                            keyExtractor={(item) => `${item.id}`}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: SIZES.padding }}
                        />
                    ) : (
                        <Text style={{ ...FONTS.body3, color: COLORS.white, marginTop: SIZES.padding }}>
                            Bạn chưa có sách yêu thích.
                        </Text>
                    )
                ) : (
                    <Text style={{ ...FONTS.body3, color: COLORS.white, marginTop: SIZES.padding }}>
                        Vui lòng đăng nhập để xem sách yêu thích.
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Setting;