import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";

// Hàm debounce đơn giản
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hàm gọi API tìm kiếm sách
  const fetchBooks = async (query) => {
    if (!query) {
      setFilteredBooks([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      const apiBooks = response.data.items?.map((item) => ({
        id: item.id,
        bookName: item.volumeInfo.title,
        bookCover: item.volumeInfo.imageLinks?.thumbnail
          ? { uri: item.volumeInfo.imageLinks.thumbnail }
          : images.theTinyDragon,
        rating: item.volumeInfo.averageRating || 4.0,
        language: item.volumeInfo.language || "Eng",
        pageNo: item.volumeInfo.pageCount || 300,
        author: item.volumeInfo.authors?.[0] || "Unknown",
        genre: item.volumeInfo.categories || ["Adventure"],
        readed: "10k",
        description: item.volumeInfo.description || "No description available.",
        backgroundColor: "rgba(240,240,232,0.9)",
        navTintColor: "#000",
        completion: "0%",
        lastRead: "N/A",
      })) || [];
      setFilteredBooks(apiBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      setFilteredBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm debounce cho tìm kiếm
  const debouncedFetchBooks = debounce(fetchBooks, 500);

  // Xử lý thay đổi văn bản tìm kiếm
  const handleSearch = (text) => {
    setSearchText(text);
    debouncedFetchBooks(text);
  };

  // Hàm thêm/xóa sách yêu thích
  const toggleFavorite = async (book) => {
    if (!userLogin || !userLogin.uid) {
      Alert.alert("Thông báo", "Vui lòng đăng nhập để sử dụng tính năng này");
      return;
    }

    try {
      const userRef = firestore().collection("NguoiDung").doc(userLogin.uid);
      const userDoc = await userRef.get();
      let updatedFavorites = userDoc.exists ? userDoc.data().favorites || [] : [];

      const bookToSave = {
        id: book.id,
        bookName: book.bookName,
        author: book.author,
        bookCover: book.bookCover?.uri || book.bookCover,
        rating: book.rating,
        pageNo: book.pageNo,
        description: book.description,
        language: book.language,
        genre: book.genre,
      };

      const isFavorite = updatedFavorites.some((fav) => fav.id === book.id);
      if (isFavorite) {
        updatedFavorites = updatedFavorites.filter((fav) => fav.id !== book.id);
        Alert.alert("Thành công", "Đã xóa khỏi danh sách yêu thích");
      } else {
        updatedFavorites.push(bookToSave);
        Alert.alert("Thành công", "Đã thêm vào danh sách yêu thích");
      }

      setFavorites(updatedFavorites);
      await userRef.set({ favorites: updatedFavorites }, { merge: true });
    } catch (error) {
      console.error("Error updating favorites:", error);
      Alert.alert("Lỗi", "Không thể cập nhật danh sách yêu thích");
    }
  };

  // Giao diện hiển thị từng mục sách
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        padding: SIZES.padding,
        marginVertical: SIZES.base,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
      }}
      onPress={() =>
        navigation.navigate("BookDetail", {
          book: item,
        })
      }
    >
      <Image
        source={item.bookCover}
        resizeMode="cover"
        style={{ width: 100, height: 150, borderRadius: 10 }}
      />
      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
        <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
        <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
          <Image
            source={icons.page_filled_icon}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.lightGray,
            }}
          />
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.lightGray,
              paddingHorizontal: SIZES.radius,
            }}
          >
            {item.pageNo}
          </Text>
          <Image
            source={icons.read_icon}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.lightGray,
            }}
          />
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.lightGray,
              paddingHorizontal: SIZES.radius,
            }}
          >
            {item.readed}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={{ padding: SIZES.padding }}>
        <TextInput
          style={{
            height: 50,
            backgroundColor: COLORS.gray,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            color: COLORS.white,
            ...FONTS.body3,
          }}
          placeholder="Tìm kiếm sách kho sách..."
          placeholderTextColor={COLORS.lightGray}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>Đang tải...</Text>
        </View>
      ) : filteredBooks.length === 0 && searchText ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>Không tìm thấy sách</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: SIZES.padding }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;