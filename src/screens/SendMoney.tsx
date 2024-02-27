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
      {route.params && (
        <>
          <Text>Amount: {route.params.amount}</Text>
          <Text>Recipient: {route.params.to}</Text>
          <Text>Currency: {route.params.currency}</Text>
          <Text>Chain: {route.params.chain}</Text>
        </>
      )}
    </View>
  );
};
