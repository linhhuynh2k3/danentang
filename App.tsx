import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DemoTheme from './buoi3/DemoTheme';
import HelloWorld from './Lab1/Project1'; // phải đúng với export default
import Project2 from './Lab1/Project2';
import Project3 from './Lab1/Project3';
import Project5 from './Lab1/Project5';
import PressTest from './Lab1/Project4';
import Project6 from './Lab1/Project6';
import Project7 from './Lab1/Project7';
import Project8 from './Lab1/Project8';
import FormLogin from './buoi3/FormLogin';
import Calculator from './Lab1/Calycurator';
import { Provider } from 'react-redux';
import Index from './buoi4/Index';
import MyDrawer from './buoi4/MyDrawer';
import { enableScreens, enableFreeze } from 'react-native-screens';
import TabNavigator from './Lab2/components/routers';

const App = () => {
  return (
    //<HelloWorld />
    //<Project2 />
    //<Project3 />
    //<Project5 />
    //<PressTest />
    //<Project6 />
    //<Project7 />
    //<Project8 />
    //<FormLogin />
    //<Calculator />
    //<Provider store={store}>
    <TabNavigator />
    // </Provider>
    //<Index />
    /*<NavigationContainer>
      <MyDrawer />
    </NavigationContainer>*/

  );
};

export default App;
