import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "../routers/RouterService";
import Transaction from "../screens/Transaction";
import Customers from "../screens/Customers";
import Profile from "../screens/Profile";
import UpdateCustomer from "../screens/UpdateCustomer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const CustomerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Customers"
                component={Customers}
                options={{ title: 'Danh sách khách hàng' }}
            />
            <Stack.Screen
                name="UpdateCustomer"
                component={UpdateCustomer}
                options={{ title: 'Cập nhật khách hàng' }}
            />
        </Stack.Navigator>
    );
};

const Admin = () => {
    return (
        <Tab.Navigator
            activeColor="#ff6b6b"
            inactiveColor="#95a5a6"
            barStyle={{ backgroundColor: '#ffffff' }}
        >
            <Tab.Screen
                name="Home"
                component={RouterService}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={Transaction}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cash" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Customer"
                component={CustomerStack}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Admin;