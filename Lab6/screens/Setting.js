import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS, FONTS, SIZES } from '../constants';
import { useMyContextController, logout } from '../store';
import firebase from '@react-native-firebase/app';
import '../firebaseConfig';
import firestore from '@react-native-firebase/firestore'; // ✅ import đúng từ firestore




const Setting = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin, favorites } = controller;
  const [loading, setLoading] = useState(true);

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
          dispatch({ type: 'SET_FAVORITES', payload: userData.favorites || [] });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userLogin]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => navigation.navigate('BookDetail', { book: item })}
    >
      <Image
        source={{ uri: item.bookCover }}
        style={styles.bookImage}
        resizeMode="cover"
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.bookName}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        {userLogin && (
          <Button mode="contained" buttonColor={COLORS.primary} onPress={handleLogout}>
            Đăng xuất
          </Button>
        )}
      </View>

      {userLogin ? (
        <>
          <Text style={styles.subText}>Đăng nhập với: {userLogin.email}</Text>
          <Text style={styles.sectionTitle}>Sách yêu thích</Text>
          {favorites.length > 0 ? (
            <FlatList
              data={favorites}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <Text style={styles.emptyText}>Bạn chưa có sách yêu thích.</Text>
          )}
        </>
      ) : (
        <Button
          mode="contained"
          buttonColor={COLORS.primary}
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: 20 }}
        >
          Đăng nhập
        </Button>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#fff',
    padding: SIZES.padding,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text || COLORS.black,
  },
  subText: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.base,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text || COLORS.black,
    marginVertical: SIZES.base,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  bookImage: {
    width: 90,
    height: 135,
  },
  bookInfo: {
    flex: 1,
    padding: SIZES.base,
    justifyContent: 'center',
  },
  bookTitle: {
    ...FONTS.h4,
    color: COLORS.text || COLORS.black,
  },
  bookAuthor: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 4,
  },
  emptyText: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Setting;
