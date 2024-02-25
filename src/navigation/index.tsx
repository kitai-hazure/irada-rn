import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens';
import DrawerNavigator from './DrawerNavigator';
import {useWallet} from '../hooks';
import {AppNavigatorRoutes} from '../../types/navigation';

const Stack = createStackNavigator<AppNavigatorRoutes>();

const AppNavigator = () => {
  const {isLoggedIn} = useWallet();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={isLoggedIn ? 'Main' : 'Login'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
