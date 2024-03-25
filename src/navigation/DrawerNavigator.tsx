import React from 'react';
import {
  Contacts,
  SavedContacts,
  SendMoney,
  Settings,
  Home,
  Scan,
  TransactionHistory,
  TokenBalances,
  ScheduleTransactions,
} from '../screens';
import {
  useAlchemyInitialize,
  useStartNotifeeModals,
  useStartTransactionModals,
  useThemedStyles,
  useWalletConnectEvents,
  useWalletConnectInitialize,
  useDeeplink,
} from '../hooks';
import {
  ContactsIcon,
  HomeIcon,
  SavedContactsIcon,
  ScheduleTransactionsIcon,
  SendMoneyIcon,
  SettingsIcon,
  TokenBalancesIcon,
  TransactionHistoryIcon,
} from '../components';
import {Drawer} from './navigators';

export const DrawerNavigator = () => {
  const themedStyles = useThemedStyles(() => {});
  const initialized = useWalletConnectInitialize();
  useWalletConnectEvents(initialized);
  useAlchemyInitialize();
  useStartNotifeeModals();
  useStartTransactionModals();
  useDeeplink();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerType: 'slide',
        drawerActiveBackgroundColor: 'transparent',
        drawerInactiveBackgroundColor: 'transparent',
        drawerActiveTintColor: themedStyles.theme.purple,
        drawerInactiveTintColor: themedStyles.theme.text,
        overlayColor: 'transparent',
        sceneContainerStyle: {
          backgroundColor: themedStyles.theme.container,
        },
        drawerLabelStyle: {
          fontSize: 14,
        },
        drawerStyle: {
          backgroundColor: themedStyles.theme.container,
          width: '65%',
          elevation: 0,
          borderWidth: 0,
        },
        headerShown: false,
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{drawerIcon: HomeIcon}}
      />
      <Drawer.Screen
        name="SavedContacts"
        component={SavedContacts}
        options={{
          drawerIcon: SavedContactsIcon,
          drawerLabel: 'Saved Contacts',
          title: 'Saved Contacts',
        }}
      />
      <Drawer.Screen
        name="Contacts"
        component={Contacts}
        options={{drawerIcon: ContactsIcon}}
      />
      <Drawer.Screen
        name="SendMoney"
        component={SendMoney}
        options={{
          unmountOnBlur: true,
          drawerLabel: 'Send Money',
          title: 'Send Money',
          drawerIcon: SendMoneyIcon,
        }}
      />
      <Drawer.Screen
        name="Scan"
        component={Scan}
        options={{
          unmountOnBlur: true,
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{
          drawerIcon: TransactionHistoryIcon,
          drawerLabel: 'Transaction History',
        }}
      />
      <Drawer.Screen
        name="TokenBalances"
        component={TokenBalances}
        options={{drawerIcon: TokenBalancesIcon, drawerLabel: 'Token Balances'}}
      />
      <Drawer.Screen
        name="ScheduleTransactions"
        component={ScheduleTransactions}
        options={{
          drawerIcon: ScheduleTransactionsIcon,
          drawerLabel: 'Schedule Transactions',
          drawerLabelStyle: {},
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{drawerIcon: SettingsIcon}}
      />
    </Drawer.Navigator>
  );
};
