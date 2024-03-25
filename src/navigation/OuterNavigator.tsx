import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppNavigatorRoutes} from '../../types/navigation';
import {
  CreateWallet,
  ImportWallet,
  Login,
  Onboarding,
  BiometricLogin,
  EnableContacts,
} from '../screens';
import {useSelector} from 'react-redux';
import {selectHasWalletCreated, selectIsFirstLogin} from '../store';
import {DrawerNavigator} from './DrawerNavigator';

const Stack = createStackNavigator<AppNavigatorRoutes>();

export const OuterNavigator = () => {
  const isFirstLogin = useSelector(selectIsFirstLogin);
  const hasWalletCreated = useSelector(selectHasWalletCreated);

  const initialRouteName: keyof AppNavigatorRoutes = useMemo(() => {
    if (isFirstLogin) {
      return 'Onboarding';
    } else if (!hasWalletCreated) {
      return 'Login';
    } else {
      return 'BiometricLogin';
    }
  }, [isFirstLogin, hasWalletCreated]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BiometricLogin" component={BiometricLogin} />
      <Stack.Screen name="CreateWallet" component={CreateWallet} />
      <Stack.Screen name="ImportWallet" component={ImportWallet} />
      <Stack.Screen name="EnableContacts" component={EnableContacts} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
