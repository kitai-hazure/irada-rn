import {ParamListBase, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export type DrawerNavigatorRoutes = {
  Home: undefined;
  SendMoney: {
    chain: string;
    currency: string;
    amount: string;
    to: string;
  };
  Contacts: undefined;
  SavedContacts: undefined;
  Settings: undefined;
  Scan: undefined;
  TransactionHistory: undefined;
  TokenBalances: undefined;
  Swap: undefined;
};

export type AppNavigatorRoutes = {
  Login: undefined;
  Main: undefined;
  CreateWallet: undefined;
  ImportWallet: undefined;
  Onboarding: undefined;
  BiometricLogin: undefined;
};

export interface DrawerNavigationProps<
  Paramlist extends ParamListBase,
  RouteName extends keyof Paramlist = string,
> {
  navigation: DrawerNavigationProp<Paramlist, RouteName>;
  route: RouteProp<Paramlist, RouteName>;
}

export interface StackNavigationProps<
  Paramlist extends ParamListBase,
  RouteName extends keyof Paramlist = string,
> {
  navigation: StackNavigationProp<Paramlist, RouteName>;
  route: RouteProp<Paramlist, RouteName>;
}
