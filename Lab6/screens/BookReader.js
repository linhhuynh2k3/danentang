// Lab6/screens/BookReader.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const BookReader = ({ route, navigation }) => {
    const [book, setBook] = useState(route.params?.book || null);
    const [content, setContent] = useState('');
    const [controller] = useMyContextController();
    const { userLogin } = controller;

    useEffect(() => {
        if (!userLogin) {
            navigation.navigate('Login');
            return;
        }

        // Truy xuất nội dung sách từ Firestore
        const fetchContent = async () => {
            if (book) {
                // Giả sử nội dung sách được lưu trong trường `content` của document sách
                const bookRef = firestore().collection('Books').where('bookName', '==', book.bookName);
                const snapshot = await bookRef.get();
                if (!snapshot.empty) {
                    const bookData = snapshot.docs[0].data();
                    setContent(bookData.content || 'No content available.');
                }
            }
        };

        fetchContent();
    }, [book, userLogin, navigation]);

    if (!book) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white, textAlign: 'center' }}>
                    No book selected
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <ScrollView contentContainerStyle={{ padding: SIZES.padding }}>
                <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>
                    {book.bookName}
                </Text>
                <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>
                    {content}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BookReader;