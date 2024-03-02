import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Contacts, SavedContacts, SendMoney} from '../screens';
import {DrawerNavigatorRoutes} from '../../types/navigation';
import {useThemedStyles} from '../hooks';
import {
  ContactsIcon,
  SavedContactsIcon,
  SendMoneyIcon,
} from '../components/icons/DrawerIcons';

const Drawer = createDrawerNavigator<DrawerNavigatorRoutes>();

const DrawerNavigator = () => {
  const themedStyles = useThemedStyles(() => {});

  return (
    <Drawer.Navigator
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
        options={{
          drawerIcon: ContactsIcon,
        }}
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
