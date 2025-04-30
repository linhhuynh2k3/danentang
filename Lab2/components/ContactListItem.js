import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utility/colors';

const ContactListItem = ({ name, avatar, phone, onPress }) => {
    return (
        <TouchableHighlight
            underlayColor={colors.grey}
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.contactInfo}>
                <Image
                    style={styles.avatar}
                    source={avatar ? { uri: avatar } : console.log(require('../assets/defaultavatar.png'))}
                    defaultSource={require('../assets/defaultavatar.png')}
                />
                <View style={styles.details}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>{phone}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

ContactListItem.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

ContactListItem.defaultProps = {
    name: 'Unknown Name',
    avatar: null, // Thay thế bằng URL khác
    phone: 'Unknown Phone',
    onPress: () => { },
};

export default ContactListItem;

const styles = StyleSheet.create({
    contactInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 24,
        borderBottomColor: colors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    avatar: {
        borderRadius: 22,
        width: 44,
        height: 44
    },
    details: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 20,
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        color: colors.blue,
        fontSize: 15,
        marginTop: 4,
    },
});