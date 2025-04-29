import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Setting from './Setting';
import CustomDrawerBar from './CustomDrawerBar'; // import từ file riêng

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerBar {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Setting" component={Setting} />
        </Drawer.Navigator>
    );
};

export default MyDrawer;