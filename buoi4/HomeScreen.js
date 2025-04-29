import { Button, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Details')}
                style={{ marginTop: 20 }}
            >
                Go to Details
            </Button>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});