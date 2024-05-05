import React from 'react';
import {
  DrawerLayout,
  Header,
  TokenBalances as TokenBalancesList,
} from '../components';

const TokenBalancesScreen = () => {
  return (
    <DrawerLayout>
      <Header title="Token Balances" />
      <TokenBalancesList />
    </DrawerLayout>
  );
};

export const TokenBalances = React.memo(TokenBalancesScreen);
