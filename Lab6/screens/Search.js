import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";

const Search = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Dữ liệu sách từ Home (giả lập, bạn có thể truyền qua props hoặc context nếu cần)
  const allBooks = [
    {
      id: 1,
      bookName: "Other Words For Home",
      bookCover: require("../assets/images/other_words_for_home.jpg"),
      rating: 4.5,
      language: "Eng",
      pageNo: 341,
      author: "Jasmine Warga",
    },
    {
      id: 2,
      bookName: "The Metropolis",
      bookCover: require("../assets/images/the_metropolist.jpg"),
      rating: 4.1,
      language: "Eng",
      pageNo: 272,
      author: "Seith Fried",
    },
    {
      id: 3,
      bookName: "The Tiny Dragon",
      bookCover: require("../assets/images/the_tiny_dragon.jpg"),
      rating: 3.5,
      language: "Eng",
      pageNo: 110,
      author: "Ana C Bouvier",
    },
  ];

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = allBooks.filter(
        (book) =>
          book.bookName.toLowerCase().includes(text.toLowerCase()) ||
          book.author.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  };

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
          placeholder="Tìm kiếm sách..."
          placeholderTextColor={COLORS.lightGray}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: SIZES.padding }}
      />
    </SafeAreaView>
  );
};

export default Search;