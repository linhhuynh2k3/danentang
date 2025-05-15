import { createStackNavigator } from '@react-navigation/stack';
import Services from '../screens/Services';
import ServiceDetail from '../screens/ServiceDetail';
import Appointments from '../screens/Appointments';
import UpdateAppointment from '../screens/UpdateAppointment';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

const RouterCustomer = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Services"
                component={Services}
                options={{ title: 'Danh sách dịch vụ' }}
            />
            <Stack.Screen
                name="ServiceDetail"
                component={ServiceDetail}
                options={{ title: 'Chi tiết dịch vụ' }}
            />
            <Stack.Screen
                name="Appointments"
                component={Appointments}
                options={{ title: 'Lịch hẹn' }}
            />
            <Stack.Screen
                name="UpdateAppointment"
                component={UpdateAppointment}
                options={{ title: 'Cập nhật lịch hẹn' }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ title: 'Hồ sơ' }}
            />
        </Stack.Navigator>
    );
};

export default RouterCustomer;