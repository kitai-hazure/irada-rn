import {LinkingOptions} from '@react-navigation/native';
import {Linking} from 'react-native';
import {DeeplinkHelper} from '../helpers/DeeplinkHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from './constants';

export const linking: LinkingOptions<any> = {
  prefixes: ['irada://'],
  subscribe(_) {
    /**
     * Ignore listener from react navigation
     * Listen to incoming links from deep linking in the app
     */
    Linking.addEventListener('url', async ({url}) => {
      if (DeeplinkHelper.isValidSendTokensLink(url)) {
        await AsyncStorage.setItem(
          CONSTANTS.STORAGE.DEEPLINK_SEND,
          JSON.stringify(DeeplinkHelper.parseParams(url)),
        );
      }
    });
    return () => {
      Linking.removeAllListeners('url');
    };
  },
};
