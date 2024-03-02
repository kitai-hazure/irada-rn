import {LinkingOptions} from '@react-navigation/native';

export const linking: LinkingOptions<any> = {
  prefixes: ['irada://'],
  config: {
    initialRouteName: 'Login',
    screens: {
      Main: {
        screens: {
          Home: 'home',
          Contacts: 'contacts',
          SendMoney: {
            path: 'send',
          },
        },
      },
      Login: 'login',
    },
  },
};
