import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../store';
import { fetchContacts } from '../utility/api';

const Contacts = ({ navigation }) => {
    const { contacts, loading, error } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContactsLoading());
        fetchContacts()
            .then((data) => dispatch(fetchContactsSuccess(data)))
            .catch(() => dispatch(fetchContactsError()));
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { contact: item })}>
            <Text style={{ padding: 15 }}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text>Error loading contacts</Text>}
            {!loading && !error && (
                <FlatList data={contacts} keyExtractor={(item) => item.id} renderItem={renderItem} />
            )}
        </View>
    );
};

export default Contacts;
