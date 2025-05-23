import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Alert,
} from "react-native";
import { FONTS, COLORS, SIZES, icons } from "../constants";
import { useMyContextController } from "../store";


const LineDivider = () => (
  <View style={{ width: 1, paddingVertical: 5 }}>
    <View
      style={{ flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1 }}
    />
  </View>
);

const BookDetail = ({ route, navigation }) => {
  const [controller, dispatch, { toggleFavorite }] = useMyContextController();
  const { userLogin, favorites } = controller;
  const [book, setBook] = React.useState(null);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);
  const indicator = new Animated.Value(0);

  React.useEffect(() => {
    if (route.params?.book) {
      setBook(route.params.book);
      checkIfFavorite(route.params.book);
    }
  }, [route.params?.book, favorites]);

  const checkIfFavorite = (book) => {
    if (!favorites || favorites.length === 0) return;
    const isFav = favorites.some((fav) => fav.id === book.id);
    setIsFavorite(isFav);
  };

  const handleToggleFavorite = () => {
    if (!userLogin || !userLogin.uid) {
      Alert.alert("Thông báo", "Vui lòng đăng nhập để sử dụng tính năng này");
      return;
    }
    toggleFavorite(book, favorites);
    setIsFavorite((prev) => !prev);
  };

  const renderBookInfoSection = () => (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={book.bookCover}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: book.backgroundColor,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.radius,
          height: 80,
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: SIZES.base }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back_arrow_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: book.navTintColor,
            }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ ...FONTS.h3, color: book.navTintColor }}>Book Detail</Text>
        </View>
        <View style={{ marginRight: SIZES.base }} />
      </View>
      <View style={{ flex: 5, paddingTop: SIZES.padding2, alignItems: "center" }}>
        <Image
          source={book.bookCover}
          resizeMode="contain"
          style={{ flex: 1, width: 150 }}
        />
      </View>
      <View style={{ flex: 1.8, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ ...FONTS.h2, color: book.navTintColor }}>{book.bookName}</Text>
        <Text style={{ ...FONTS.body3, color: book.navTintColor }}>{book.author}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 20,
          margin: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.rating}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.white }}>Rating</Text>
        </View>
        <LineDivider />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.pageNo}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.white }}>Pages</Text>
        </View>
        <LineDivider />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.language}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.white }}>Language</Text>
        </View>
      </View>
    </View>
  );

  const renderBookDescription = () => {
    const indicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) / scrollViewWholeHeight
        : scrollViewVisibleHeight;
    const difference =
      scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1;

    return (
      <View style={{ flex: 1, flexDirection: "row", padding: SIZES.padding }}>
        <View style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}>
          <Animated.View
            style={{
              width: 4,
              height: indicatorSize,
              backgroundColor: COLORS.lightGray4,
              transform: [
                {
                  translateY: Animated.multiply(
                    indicator,
                    scrollViewVisibleHeight / scrollViewWholeHeight
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(w, h) => setScrollViewWholeHeight(h)}
          onLayout={(e) => setScrollViewVisibleHeight(e.nativeEvent.layout.height)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: indicator } } }],
            { useNativeDriver: false }
          )}
        >
          <Text
            style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}
          >
            Description
          </Text>
          <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>
            {book.description}
          </Text>
        </ScrollView>
      </View>
    );
  };

  const renderBottomButton = () => (
    <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: SIZES.padding }}>
      <TouchableOpacity
        style={{
          width: 60,
          backgroundColor: COLORS.secondary,
          marginRight: SIZES.base,
          marginVertical: SIZES.base,
          borderRadius: SIZES.radius,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleToggleFavorite}
      >
        <Image
          source={isFavorite ? icons.bookmark_filled_icon : icons.bookmark_icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: isFavorite ? COLORS.primary : COLORS.lightGray2,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          marginHorizontal: SIZES.base,
          marginVertical: SIZES.base,
          borderRadius: SIZES.radius,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("BookReader", { book })}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Start Reading</Text>
      </TouchableOpacity>
    </View>
  );

  if (!book) return null;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={{ flex: 4 }}>{renderBookInfoSection()}</View>
      <View style={{ flex: 2 }}>{renderBookDescription()}</View>
      <View style={{ height: 70, marginBottom: 30 }}>{renderBottomButton()}</View>
    </View>
  );
};

export default BookDetail;
