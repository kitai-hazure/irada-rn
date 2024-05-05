import React from 'react';
import {
  useAlchemyInitialize,
  useDeeplink,
  useStartNotifeeModals,
  useStartTransactionModals,
  useThemedStyles,
  useWalletConnectEvents,
  useWalletConnectInitialize,
} from '../hooks';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {linking} from '../config';
import {OuterNavigator} from './OuterNavigator';
import {Modals} from '../components';

const AppNavigator = () => {
  const themedStyles = useThemedStyles(() => {});
  const initialized = useWalletConnectInitialize();
  useWalletConnectEvents(initialized);
  useAlchemyInitialize();
  useStartNotifeeModals();
  useStartTransactionModals();
  useDeeplink();

  return (
    <NavigationContainer
      linking={linking}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: themedStyles.theme.background,
        },
      }}>
      <OuterNavigator />
      <Modals />
    </NavigationContainer>
  );
};

export default AppNavigator;
