// routers/AdminRouter.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// Import các màn hình
import Services from "../screens/Admin/Services";
import Transaction from "../screens/Admin/Transaction";

import Setting from "../screens/Admin/Setting";

const Tab = createBottomTabNavigator();

export default function AdminRouter() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "Home": iconName = "home"; break;
                        case "Transaction": iconName = "document-text"; break;
                        case "Customer": iconName = "people"; break;
                        case "Setting": iconName = "settings"; break;
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Services} />
            <Tab.Screen name="Transaction" component={Transaction} />
            <Tab.Screen name="Customer" component={Customer} />
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    );
}
