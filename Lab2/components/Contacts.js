import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactListItem from '../components/ContactListItem';

const keyExtractor = (contact) => contact.phone;

const Contacts = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadContacts = () => {
        setLoading(true);
        setError(false);
        fetchContacts()
            .then((contacts) => {
                setContacts(contacts);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setLoading(false);
                setError(true);
            });
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const contactsSorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

    const renderContact = ({ item }) => {
        const { name, avatar, phone } = item;
        return (
            <ContactListItem
                name={name}
                avatar={avatar}
                phone={phone}
                onPress={() => navigation.navigate('Profile', { contact: item })}
            />
        );
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator color="blue" size="large" />}
            {error && (
                <>
                    <Text style={styles.errorText}>Error loading contacts.</Text>
                    <Button title="Try Again" onPress={loadContacts} />
                </>
            )}
            {!loading && !error && (
                <FlatList
                    data={contactsSorted}
                    keyExtractor={keyExtractor}
                    renderItem={renderContact}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Contacts;