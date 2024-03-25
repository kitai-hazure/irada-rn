import React from 'react';
import {
  DrawerNavigationProps,
  DrawerNavigatorRoutes,
} from '../../types/navigation';

import {DrawerLayout, Header, SendTokens} from '../components';

export const SendMoney = ({}: DrawerNavigationProps<
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
