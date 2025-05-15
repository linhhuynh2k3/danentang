import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterCustomer from "../routers/RouterCustomer";
import Appointments from "../screens/Appointments";
import Profile from "../screens/Profile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const Customer = () => {
    return (
        <Tab.Navigator
            activeColor="#ff6b6b"
            inactiveColor="#95a5a6"
            barStyle={{ backgroundColor: '#ffffff' }}
        >
            <Tab.Screen
                name="Services"
                component={RouterCustomer}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Appointments"
                component={Appointments}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="calendar" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Customer;