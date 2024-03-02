import React from 'react';
import {useWallet} from '../hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {AppNavigatorRoutes} from '../../types/navigation';
import {Login, Mnemonic} from '../screens';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator<AppNavigatorRoutes>();

export const OuterNavigator = () => {
  const {isLoggedIn} = useWallet();

  const initialRouteName = isLoggedIn ? 'Main' : 'Login';

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Mnemonic'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Mnemonic" component={Mnemonic} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
