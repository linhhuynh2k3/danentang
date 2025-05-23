import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview'; // Thay đổi import này
import { FONTS, COLORS } from "../constants";

const BookReader = ({ route }) => {
    const { book } = route.params;

    // Sử dụng Google Books API để lấy nội dung sách
    const bookContentUrl = `https://books.google.com/books?id=${book.id}&lpg=PP1&pg=PP1&output=embed`;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <View style={{ flex: 1 }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white, padding: 20 }}>
                    {book.bookName} - {book.author}
                </Text>
                <WebView
                    source={{ uri: bookContentUrl }}
                    style={{ flex: 1 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                />
            </View>
        </SafeAreaView>
    );
};

export default BookReader;