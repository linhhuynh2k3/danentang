import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from '../navigation/tabs';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import BookDetail from '../screens/BookDetail';
import BookReader from '../screens/BookReader';
import { MyContextControllerProvider } from '../store';
import { Provider as PaperProvider } from 'react-native-paper';
import '../firebaseConfig';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: 'transparent',
    },
};

const Stack = createStackNavigator();

const Router = () => {
    return (
        <PaperProvider>
            <MyContextControllerProvider>
                <NavigationContainer theme={theme}>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName="Login"
                    >
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                        <Stack.Screen name="Home" component={Tabs} />
                        <Stack.Screen name="BookDetail" component={BookDetail} />
                        <Stack.Screen name="BookReader" component={BookReader} />
                    </Stack.Navigator>
                </NavigationContainer>
            </MyContextControllerProvider>
        </PaperProvider>
    );
};

export default Router;