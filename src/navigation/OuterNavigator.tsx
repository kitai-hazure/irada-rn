import React, {useMemo} from 'react';
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
import {OuterStack} from './navigators';

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
    <OuterStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <OuterStack.Screen name="Onboarding" component={Onboarding} />
      <OuterStack.Screen name="Login" component={Login} />
      <OuterStack.Screen name="BiometricLogin" component={BiometricLogin} />
      <OuterStack.Screen name="CreateWallet" component={CreateWallet} />
      <OuterStack.Screen name="ImportWallet" component={ImportWallet} />
      <OuterStack.Screen name="EnableContacts" component={EnableContacts} />
      <OuterStack.Screen name="Main" component={DrawerNavigator} />
    </OuterStack.Navigator>
  );
};
