import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ContactThumbnail from '../ContactThumbnail';
import colors from '../../utility/colors';
import { fetchUserContact } from '../../utility/api';

const User = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchUserContact()
            .then(users => {
                setUser(users);
                setLoading(false);
                setError(false);
            })
            .catch(e => {
                setLoading(false);
                setError(true);
            });
    }, []);

    const avatar = user?.avatar;
    const name = user?.name;
    const phone = user?.phone;

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text>Error...</Text>}
            {!loading && !error && user && (
                <ContactThumbnail avatar={avatar} name={name} phone={phone} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
});

export default User;