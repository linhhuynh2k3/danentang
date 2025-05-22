import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import Router from './routers/Router';

const CodeRun = () => {
    useEffect(() => {
        const initData = async () => {
            const categoriesRef = firestore().collection('Categories');
            const booksRef = firestore().collection('Books');
            const contentsRef = firestore().collection('BookContents');

            const snapshotCategories = await categoriesRef.get();
            if (!snapshotCategories.empty) {
                console.log('Dữ liệu danh mục sách đã tồn tại, không thêm lại.');
                return;
            }

            const bookCategories = [
                'Best Seller',
                'The Latest',
                'Coming Soon',
                'Classics',
                'Fantasy',
                'Mystery',
                'Science Fiction',
                'Biography',
            ];

            const categoryDocs = {};
            for (const category of bookCategories) {
                const docRef = await categoriesRef.add({ categoryName: category });
                categoryDocs[category] = docRef.id;
            }

            const bookData = {
                'Best Seller': [
                    {
                        id: 'book1',
                        bookName: 'Other Words For Home',
                        author: 'Jasmine Warga',
                        rating: 4.5,
                        language: 'Eng',
                        pageNo: 341,
                        bookCover: 'https://example.com/other_words_for_home.jpg',
                        description: 'A novel about a young girl\'s journey.',
                        genre: ['Adventure'],
                        readed: '10k',
                        backgroundColor: 'rgba(240,240,232,0.9)',
                        navTintColor: '#000',
                        contentId: 'content_book1',
                    },
                    {
                        id: 'book2',
                        bookName: 'The Metropolis',
                        author: 'Seith Fried',
                        rating: 4.1,
                        language: 'Eng',
                        pageNo: 272,
                        bookCover: 'https://example.com/the_metropolist.jpg',
                        description: 'A futuristic tale of urban life.',
                        genre: ['Science Fiction'],
                        readed: '8k',
                        backgroundColor: 'rgba(240,240,232,0.9)',
                        navTintColor: '#000',
                        contentId: 'content_book2',
                    },
                ],
                'Fantasy': [
                    {
                        id: 'book3',
                        bookName: 'The Tiny Dragon',
                        author: 'Ana C Bouvier',
                        rating: 3.5,
                        language: 'Eng',
                        pageNo: 110,
                        bookCover: 'https://example.com/the_tiny_dragon.jpg',
                        description: 'A magical story of a small dragon.',
                        genre: ['Fantasy'],
                        readed: '5k',
                        backgroundColor: 'rgba(240,240,232,0.9)',
                        navTintColor: '#000',
                        contentId: 'content_book3',
                    },
                ],
            };

            const contentData = [
                {
                    contentId: 'content_book1',
                    chapters: [
                        { chapterNumber: 1, title: 'Chapter 1', text: 'This is the first chapter of Other Words For Home...' },
                        { chapterNumber: 2, title: 'Chapter 2', text: 'This is the second chapter of Other Words For Home...' },
                    ],
                },
                {
                    contentId: 'content_book2',
                    chapters: [
                        { chapterNumber: 1, title: 'Chapter 1', text: 'This is the first chapter of The Metropolis...' },
                    ],
                },
                {
                    contentId: 'content_book3',
                    chapters: [
                        { chapterNumber: 1, title: 'Chapter 1', text: 'This is the first chapter of The Tiny Dragon...' },
                    ],
                },
            ];

            for (const category of bookCategories) {
                const bookList = bookData[category] || [];
                for (const book of bookList) {
                    await booksRef.add({
                        ...book,
                        categoryId: categoryDocs[category],
                    });
                }
            }

            for (const content of contentData) {
                await contentsRef.add(content);
            }

            console.log('✅ Đã thêm dữ liệu sách và nội dung mẫu vào Firestore thành công!');
        };

        initData();
    }, []);

    return <Router />;
};

export default CodeRun;