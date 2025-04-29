import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactThumbnail from '../components/ContactThumbnail';
import { useDispatch, useSelector } from 'react-redux';
const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
    // State
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Load dữ liệu
    useEffect(() => {
        setLoading(true);
        setError(false);

        fetchContacts()
            .then((contacts) => {
                setContacts(contacts);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    }, []);

    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigation.navigate('Profile', { contact: item })}
            />
        );
    };

    const favorites = contacts.filter((contact) => contact.favorite);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text>Error loading contacts...</Text>}
            {!loading && !error && (
                <FlatList
                    data={favorites}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                    contentContainerStyle={styles.list}
                    renderItem={renderFavoriteThumbnail}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    list: {
        alignItems: 'center',
    },
});

export default Favorites;