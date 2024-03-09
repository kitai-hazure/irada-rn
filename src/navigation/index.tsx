import React from 'react';
import {
  useThemedStyles,
  useWalletConnectEvents,
  useWalletConnectInitialize,
} from '../hooks';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {linking} from '../config';
import {OuterNavigator} from './OuterNavigator';

const AppNavigator = () => {
  const themedStyles = useThemedStyles(() => {});
  const initialized = useWalletConnectInitialize();
  useWalletConnectEvents(initialized);

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
    </NavigationContainer>
  );
};

export default AppNavigator;
