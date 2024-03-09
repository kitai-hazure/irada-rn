import React from 'react';
import {
  DrawerLayout,
  Header,
  TokenBalances as TokenBalancesList,
} from '../components';

export const TokenBalances = () => {
  return (
    <DrawerLayout>
      <Header title="Token Balances" />
      <TokenBalancesList />
    </DrawerLayout>
  );
};
