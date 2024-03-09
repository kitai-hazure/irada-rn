import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Contacts,
  SavedContacts,
  SendMoney,
  Settings,
  Home,
  Scan,
  TransactionHistory,
  TokenBalances,
} from '../screens';
import {DrawerNavigatorRoutes} from '../../types/navigation';
import {useThemedStyles} from '../hooks';
import {
  ContactsIcon,
  HomeIcon,
  SavedContactsIcon,
  SendMoneyIcon,
  SettingsIcon,
} from '../components';

const Drawer = createDrawerNavigator<DrawerNavigatorRoutes>();

const DrawerNavigator = () => {
  const themedStyles = useThemedStyles(() => {});

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
          width: '60%',
          elevation: 0,
          shadowColor: 'red',
          borderWidth: 0,
          borderColor: 'red',
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
          drawerLabel: 'Send Money',
          title: 'Send Money',
          drawerIcon: SendMoneyIcon,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{drawerIcon: SettingsIcon}}
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
        options={{drawerItemStyle: {display: 'none'}}}
      />
      <Drawer.Screen
        name="TokenBalances"
        component={TokenBalances}
        options={{drawerItemStyle: {display: 'none'}}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
