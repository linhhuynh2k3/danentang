import 'react-native-get-random-values';
import { v4 } from 'uuid';

const mapContact = (contact) => {
    const {
        name,
        picture,
        phone,
        cell,
        email,
    } = contact;

    return {
        id: v4(),
        name: name.first + " " + name.last,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() > 0.5, // randomly generate favorite contacts
    };
};

export const fetchContacts = async () => {
    const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
    const contactData = await response.json();
    return contactData.results.map(mapContact);
};

export const fetchUserContact = async () => {
    const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
    const userData = await response.json();
    return mapContact(userData.results[0]);
};

export const fetchRandomContact = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const userData = await response.json();
    return mapContact(userData.results[0]);
};
