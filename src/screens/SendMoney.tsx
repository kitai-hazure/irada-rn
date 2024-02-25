import {Text, View} from 'react-native';
import React from 'react';
import {
  DrawerNavigationProps,
  DrawerNavigatorRoutes,
} from '../../types/navigation';

export const SendMoney = ({
  route,
}: DrawerNavigationProps<DrawerNavigatorRoutes, 'SendMoney'>) => {
  console.log('ROUTE PARAMS', route.params);

  return (
    <View>
      <Text>SendMoney</Text>
    </View>
  );
};
