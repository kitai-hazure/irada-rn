import React from 'react';
import {
  DrawerNavigationProps,
  DrawerNavigatorRoutes,
} from '../../types/navigation';

import {DrawerLayout, Header, SendTokens} from '../components';

const SendMoneyScreen = ({}: DrawerNavigationProps<
  DrawerNavigatorRoutes,
  'SendMoney'
>) => {
  return (
    <DrawerLayout>
      <Header title="Send Money" />
      <SendTokens type="SEND" />
    </DrawerLayout>
  );
};

export const SendMoney = React.memo(SendMoneyScreen);
