import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TrangChu from "../screens/TrangChu";
import ForgotPassword from "../screens/ForgotPassword";
import DanhSachMonAn from '../screens//DanhSachMonAn';
import Cart from '../screens/Cart';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
                name="TrangChu"
                component={TrangChu}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="DanhSachMonAn"
                component={DanhSachMonAn}
                options={{ headerShown: true }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{ headerShown: true, title: 'Giỏ hàng' }}
            />
        </Stack.Navigator>
    );
};


export default Router;
