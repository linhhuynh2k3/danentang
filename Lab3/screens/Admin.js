import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "../routers/RouterService";
import Transaction from "./Transaction";
import Customers from "../screens/Customer";
import Setting from "./Setting";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

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
                component={Customers}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
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