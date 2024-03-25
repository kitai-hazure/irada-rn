import {useEffect} from 'react';
import {Linking} from 'react-native';
import {DeeplinkHelper} from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../config';
import {useStartTransactionModals} from './useStartTransactionModals';

export const useDeeplink = () => {
  const {openModals} = useStartTransactionModals();

  useEffect(() => {
    Linking.addEventListener('url', async ({url}) => {
      if (DeeplinkHelper.isValidSendTokensLink(url)) {
        await AsyncStorage.setItem(
          CONSTANTS.STORAGE.DEEPLINK_SEND,
          JSON.stringify(DeeplinkHelper.parseParams(url)),
        );
        openModals();
      }
    });

    return () => {
      Linking.removeAllListeners('url');
    };
  }, [openModals]);
};
