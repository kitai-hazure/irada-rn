import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  AppNavigatorRoutes,
  DrawerNavigatorRoutes,
} from '../../types/navigation';
import {createStackNavigator} from '@react-navigation/stack';

export const Drawer = createDrawerNavigator<DrawerNavigatorRoutes>();
export const OuterStack = createStackNavigator<AppNavigatorRoutes>();
