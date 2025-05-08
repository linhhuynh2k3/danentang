import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, FlatList } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Todo from './todo';

function ToDoApp() {
    const [todo, setTodo] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [todos, setTodos] = React.useState([]);
    const ref = firestore().collection('todos');

    React.useEffect(() => {
        return ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { title, complete } = doc.data();
                list.push({
                    id: doc.id,
                    title,
                    complete,
                });
            });
            setTodos(list);
            if (loading) {
                setLoading(false);
            }
        });
    }, []);

    const addTodos = async () => {
        await ref.add({
            title: todo,
            complete: false,
        });
        setTodo('');
    };

    if (loading) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar>
                <Appbar.Content title={'TODOS List'} />
            </Appbar>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Todo {...item} />}
            />
            <TextInput label="New Todo" value={todo} onChangeText={setTodo} />
            <Button onPress={addTodos}>Add TODO</Button>
        </View>
    );
}

export default ToDoApp;
