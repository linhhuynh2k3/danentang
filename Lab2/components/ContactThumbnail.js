
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const ContactThumbnail = ({ name, phone, avatar, textColor, onPress }) => {
    const colorStyle = { color: textColor };
    const ImageComponent = onPress ? TouchableOpacity : View;

    return (
        <View style={styles.container}>
            <ImageComponent onPress={onPress} style={styles.avatarWrapper}>
                <Image
                    source={{ uri: avatar }} // ✅ Đã sửa đúng nè
                    style={styles.avatar}
                />
            </ImageComponent>
            {name ? <Text style={[styles.name, colorStyle]}>{name}</Text> : null}
            {phone ? (
                <View style={styles.phoneSection}>
                    <Icon name="phone" size={16} style={[styles.phoneIcon, colorStyle]} />
                    <Text style={[styles.phone, colorStyle]}>{phone}</Text>
                </View>
            ) : null}
        </View>
    );
};

ContactThumbnail.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    phone: PropTypes.string,
    textColor: PropTypes.string,
    onPress: PropTypes.func,
};

ContactThumbnail.defaultProps = {
    name: '',
    avatar: '',
    phone: '',
    textColor: 'white',
    onPress: null,
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarWrapper: {
        borderRadius: 45,
        overflow: 'hidden',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: '#ccc', // ✅ thêm màu nền nếu load lỗi
    },
    name: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    phoneSection: {
        flexDirection: 'row',
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    phoneIcon: {
        marginRight: 4,
    },
    phone: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ContactThumbnail;
