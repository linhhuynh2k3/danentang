import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import axios from "axios";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { useMyContextController } from "../store";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}
      ></View>
    </View>
  );
};

const Home = ({ navigation }) => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const profileData = {
    name: userLogin?.email || "Username",
    point: 200,
  };

  const [profile, setProfile] = useState(profileData);
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const handleToggleFavorite = (book) => {
    if (!userLogin || !userLogin.uid) {
      Alert.alert("Thông báo", "Vui lòng đăng nhập để sử dụng tính năng này");
      return;
    }
    toggleFavorite(book, favorites);
  };
  // Lấy nhiều sách hơn từ API
  useEffect(() => {
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=novel&maxResults=40") // Tăng maxResults lên 40
      .then((response) => {
        const apiBooks = response.data.items.map((item) => ({
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
        }));
        setBooks(apiBooks);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const categoriesData = [
    {
      id: 1,
      categoryName: "Best Seller",
      books: books.slice(0, 5), // Tăng số lượng sách
    },
    {
      id: 2,
      categoryName: "The Latest",
      books: books.slice(6, 10), // Tăng số lượng sách
    },
    {
      id: 3,
      categoryName: "Coming Soon",
      books: books.slice(11, 15), // Tăng số lượng sách
    },
    {
      id: 4,
      categoryName: "Classics",
      books: books.slice(16, 20), // Tăng số lượng sách
    },
    {
      id: 5,
      categoryName: "Fantasy",
      books: books.slice(21, 25), // Tăng số lượng sách
    },
    {
      id: 6,
      categoryName: "Mystery",
      books: books.slice(26, 30), // Tăng số lượng sách
    },
    {
      id: 7,
      categoryName: "Science Fiction",
      books: books.slice(31, 35), // Tăng số lượng sách
    },
    {
      id: 8,
      categoryName: "Biography",
      books: books.slice(36, 40), // Tăng số lượng sách
    },
  ];

  // Hàm renderHeader, renderButtonSection không thay đổi
  function renderHeader(profile) {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginRight: SIZES.padding }}>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>Chào buổi sáng</Text>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>{profile.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 40,
            paddingLeft: 3,
            paddingRight: SIZES.radius,
            borderRadius: 20,
          }}
          onPress={() => console.log("Point")}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Image
                source={icons.plus_icon}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
            <Text
              style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.body3 }}
            >
              {profile.point} điểm
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderButtonSection() {
    return (
      <View style={{ justifyContent: "center", padding: SIZES.padding }}>
        <View
          style={{
            flexDirection: "row",
            height: 70,
            backgroundColor: COLORS.secondary,
            borderRadius: SIZES.radius,
          }}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={() => console.log("Claim")}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.claim_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}
              >
                Nhận
              </Text>
            </View>
          </TouchableOpacity>
          <LineDivider />
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => console.log("Get Point")}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.point_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}
              >
                Nhận điểm
              </Text>
            </View>
          </TouchableOpacity>
          <LineDivider />
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => console.log("My Card")}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.card_icon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}
              >
                Thẻ của tôi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Cập nhật renderMyBookSection để hiển thị nhiều sách hơn
  function renderMyBookSection(myBooks) {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: index === 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
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
            style={{
              width: 180,
              height: 250,
              borderRadius: 20,
            }}
          />
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.clock_icon}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightGray,
              }}
            />
            <Text
              style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}
            >
              {item.lastRead}
            </Text>
            <Image
              source={icons.page_icon}
              style={{
                marginLeft: SIZES.radius,
                width: 20,
                height: 20,
                tintColor: COLORS.lightGray,
              }}
            />
            <Text
              style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}
            >
              {item.completion}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ paddingHorizontal: SIZES.padding }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>Sách của tôi</Text>
          <TouchableOpacity onPress={() => console.log("See More")}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray,
                textDecorationLine: "underline",
              }}
            >
              Xem thêm
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={myBooks}
          renderItem={renderItem}
          keyExtractor={(item) => `mybook-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={true} // Bật thanh cuộn ngang
          initialNumToRender={10} // Tối ưu hóa hiệu suất
        />
      </View>
    );
  }

  function renderCategoryHeader() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginRight: SIZES.padding }}
          onPress={() => setSelectedCategory(item.id)}
        >
          {selectedCategory === item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {item.categoryName}
            </Text>
          )}
          {selectedCategory !== item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>
              {item.categoryName}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ paddingLeft: SIZES.padding, marginTop: SIZES.padding }}>
        <FlatList
          data={categoriesData}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => `category-${item.id}`}
          horizontal
        />
      </View>
    );
  }

  function renderCategoryData() {
    let selectedCategoryBooks = categoriesData.filter(
      (a) => a.id === selectedCategory
    );
    let books = selectedCategoryBooks.length > 0 ? selectedCategoryBooks[0].books : [];

    const renderItem = ({ item }) => {
      return (
        <View style={{ marginVertical: SIZES.base }}>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row" }}
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
              <View>
                <Text
                  style={{
                    paddingRight: SIZES.padding,
                    ...FONTS.h2,
                    color: COLORS.white,
                  }}
                >
                  {item.bookName}
                </Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>
                  {item.author}
                </Text>
              </View>
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
              <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
                {item.genre.includes("Adventure") && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkGreen,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>
                      Phiêu lưu
                    </Text>
                  </View>
                )}
                {item.genre.includes("Romance") && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkRed,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>
                      Lãng mạn
                    </Text>
                  </View>
                )}
                {item.genre.includes("Drama") && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: SIZES.base,
                      marginRight: SIZES.base,
                      backgroundColor: COLORS.darkBlue,
                      height: 40,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>
                      Kịch
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", top: 5, right: 15 }}
            onPress={() => console.log("Bookmark")}
          >
            <Image
              source={icons.bookmark_icon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.lightGray,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={{ paddingLeft: SIZES.padding }}>
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => `book-${item.id}`}
          showsVerticalScrollIndicator={true} // Bật thanh cuộn dọc
          initialNumToRender={10} // Tối ưu hóa hiệu suất
        />
      </View>
    );
  }

  // Dữ liệu cho FlatList chính
  const data = [
    { id: "header", type: "header" },
    { id: "buttons", type: "buttons" },
    { id: "myBooks", type: "myBooks", data: books.slice(0, 10) }, // Tăng số lượng sách lên 10
    { id: "categoryHeader", type: "categoryHeader" },
    { id: "categoryData", type: "categoryData" },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "header":
        return renderHeader(profile);
      case "buttons":
        return renderButtonSection();
      case "myBooks":
        return renderMyBookSection(item.data);
      case "categoryHeader":
        return renderCategoryHeader();
      case "categoryData":
        return renderCategoryData();
      default:
        return null;
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.padding }}
      />
    </SafeAreaView>
  );
};

export default Home;