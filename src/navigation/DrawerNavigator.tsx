import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from '../screens';
import {DrawerNavigatorRoutes} from '../../types/navigation';

const Drawer = createDrawerNavigator<DrawerNavigatorRoutes>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
