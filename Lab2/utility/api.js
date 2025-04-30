import 'react-native-get-random-values';
import { v4 } from 'uuid';

// Chuyển đổi dữ liệu API thành object contact
const mapContact = (contact) => {
    if (!contact || !contact.name || !contact.picture) {
        console.warn('Invalid contact data:', contact);
        return null; // Trả về null nếu dữ liệu không hợp lệ
    }

    const { name, picture, phone, cell, email } = contact;

    return {
        id: v4(),
        name: `${name.first} ${name.last}`,
        avatar: picture.large,
        phone: phone || 'N/A', // Thêm giá trị mặc định nếu thiếu
        cell: cell || 'N/A',
        email: email || 'N/A',
        favorite: Math.random() > 0.5, // randomly generate favorite contacts
    };
};

// Hàm dùng chung để fetch và parse dữ liệu từ API
const handleFetch = async (url) => {
    try {
        console.log('Fetching URL:', url); // Log URL để kiểm tra
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log dữ liệu để kiểm tra
        return data;
    } catch (error) {
        console.error('Fetch error:', error.message); // Log lỗi chi tiết
        return null;
    }
};

// Lấy 20 liên hệ ngẫu nhiên
export const fetchContacts = async () => {
    const data = await handleFetch('https://randomuser.me/api/?results=20&seed=fullstackio');
    if (data && data.results) {
        const contacts = data.results.map(mapContact).filter(Boolean); // Loại bỏ null
        console.log('Fetched contacts:', contacts); // Log danh sách liên hệ
        return contacts;
    }
    return [];
};

// Lấy 1 liên hệ người dùng cố định
export const fetchUserContact = async () => {
    const data = await handleFetch('https://randomuser.me/api/?seed=fullstackio');
    if (data && data.results && data.results[0]) {
        const contact = mapContact(data.results[0]);
        console.log('Fetched user contact:', contact); // Log liên hệ người dùng
        return contact;
    }
    return null;
};

// Lấy 1 liên hệ ngẫu nhiên
export const fetchRandomContact = async () => {
    const data = await handleFetch('https://randomuser.me/api/');
    if (data && data.results && data.results[0]) {
        const contact = mapContact(data.results[0]);
        console.log('Fetched random contact:', contact); // Log liên hệ ngẫu nhiên
        return contact;
    }
    return null;
};