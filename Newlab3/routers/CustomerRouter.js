// routers/CustomerRouter.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// Import các màn hình customer
import Services from "../screens/Services";
import Transaction from "../screens/Transaction";
import Setting from "../screens/Setting";

const Tab = createBottomTabNavigator();

export default function CustomerRouter() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "Home": iconName = "home"; break;
                        case "Transaction": iconName = "calendar"; break;
                        case "Setting": iconName = "settings"; break;
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Services} />
            <Tab.Screen name="Transaction" component={Transaction} />
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    );
}
