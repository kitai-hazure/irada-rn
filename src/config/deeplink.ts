import {LinkingOptions} from '@react-navigation/native';

export const linking: LinkingOptions<any> = {
  prefixes: ['irada://'],
  config: {
    initialRouteName: 'Login',
    screens: {
      Main: {
        screens: {
          Home: 'home',
          SendMoney: {
            path: 'send',
          },
        },
      },
      Login: 'login',
    },
  },
};
