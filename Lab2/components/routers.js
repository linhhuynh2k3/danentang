import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './Contacts';
import Profile from './screens/Profile';
import colors from '../utility/colors';
import Favorites from './screens/Favorites';
import User from './screens/User';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Options from './screens/Options';

const Stack = createNativeStackNavigator();

const getTabBarIcon = (iconName) => ({ focused, color, size }) => (
    <MaterialIcons name={iconName} size={size} color={color} />
);

const ContactsScreens = () => (
    <Stack.Navigator
        initialRouteName="Contacts"
        screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'tomato' },
            headerTitleAlign: 'center',
        }}
    >
        <Stack.Screen name="Contacts" component={Contacts} options={{ title: "Contacts" }} />
        <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ route }) => {
                const { contact } = route.params;
                const { name } = contact;
                return {
                    title: name.split(' ')[0],
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: colors.blue,
                    },
                };
            }}
        />
    </Stack.Navigator>
);

const FavoritesScreens = () => (
    <Stack.Navigator initialRouteName="Favorites">
        <Stack.Screen name="Favorites" component={Favorites} options={{ title: "Favorites" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
    </Stack.Navigator>
);

const UserScreens = () => {
    const UserStack = createNativeStackNavigator(); // thêm riêng UserStack, đừng dùng Stack chung

    return (
        <UserStack.Navigator initialRouteName="User">
            <UserStack.Screen
                name="User"
                component={User}
                options={({ navigation }) => ({  // 💥 lấy navigation từ đây
                    headerTitle: 'Me',
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: colors.blue,
                    },
                    headerRight: () => (
                        <MaterialIcons
                            name="settings"
                            size={24}
                            style={{ color: 'white', marginRight: 10 }}
                            onPress={() => navigation.navigate('Options')}
                        />
                    ),
                })}
            />
            <UserStack.Screen
                name="Options"
                component={Options}
                options={{
                    title: 'Options',
                }}
            />
        </UserStack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="ContactsScreens"
            screenOptions={({ route }) => ({
                tabBarIcon: getTabBarIcon(
                    route.name === 'ContactsScreens' ? 'list' :
                        route.name === 'FavoritesScreens' ? 'star' :
                            'person'
                ),
                tabBarActiveTintColor: colors.greyLight,
                tabBarInactiveTintColor: colors.greyDark,
                tabBarStyle: { backgroundColor: colors.blue },
                headerShown: false,
            })}
        >
            <Tab.Screen name="ContactsScreens" component={ContactsScreens} />
            <Tab.Screen name="FavoritesScreens" component={FavoritesScreens} />
            <Tab.Screen name="UserScreens" component={UserScreens} />
        </Tab.Navigator>
    </NavigationContainer>
);

export default TabNavigator;