import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";

const notifications = [
  {
    id: 1,
    title: "Sách mới ra mắt!",
    message: "Khám phá 'The Tiny Dragon' vừa được thêm vào thư viện.",
    time: "2 giờ trước",
  },
  {
    id: 2,
    title: "Khuyến mãi đặc biệt",
    message: "Giảm 20% cho tất cả sách trong danh mục Best Seller.",
    time: "1 ngày trước",
  },
  {
    id: 3,
    title: "Cập nhật điểm",
    message: "Bạn vừa nhận được 50 điểm thưởng!",
    time: "3 ngày trước",
  },
];

const Notification = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        padding: SIZES.padding,
        marginVertical: SIZES.base,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.radius,
      }}
      onPress={() => console.log(`Clicked notification: ${item.title}`)}
    >
      <Image
        source={icons.notification_icon}
        resizeMode="contain"
        style={{ width: 30, height: 30, tintColor: COLORS.white }}
      />
      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{item.title}</Text>
        <Text style={{ ...FONTS.body4, color: COLORS.lightGray }}>
          {item.message}
        </Text>
        <Text style={{ ...FONTS.body5, color: COLORS.gray }}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={{ padding: SIZES.padding }}>
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Thông báo</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: SIZES.padding }}
      />
    </SafeAreaView>
  );
};

export default Notification;