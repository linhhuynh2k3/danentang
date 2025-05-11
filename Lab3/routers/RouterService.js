import { createStackNavigator } from '@react-navigation/stack';
import Services from '../screens/Services';
import AddNewService from '../screens/AddNewService';
import ServiceDetail from '../screens/ServiceDetail';
import ServiceDelete from '../screens/ServiceDelete';

const Stack = createStackNavigator();

const RouterService = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Services"
                component={Services}
                options={{ title: 'Danh sách dịch vụ' }}
            />
            <Stack.Screen
                name="AddNewService"
                component={AddNewService}
                options={{ title: 'Thêm dịch vụ mới' }}
            />
            <Stack.Screen
                name="ServiceDetail"
                component={ServiceDetail}
                options={{ title: 'Chi tiết dịch vụ' }}
            />
            <Stack.Screen
                name="ServiceDelete"
                component={ServiceDelete}
                options={{ title: 'Xóa dịch vụ' }}
            />
        </Stack.Navigator>
    );
};

export default RouterService;