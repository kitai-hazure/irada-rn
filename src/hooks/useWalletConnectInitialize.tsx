import {useCallback, useEffect, useState} from 'react';
import {createWeb3Wallet} from '../config';
import {ToastHelper} from '../helpers';

export const useWalletConnectInitialize = () => {
  const [initialized, setInitialized] = useState(false);

  const init = useCallback(async () => {
    try {
      await createWeb3Wallet();
      setInitialized(true);
    } catch (err: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: err.message ?? 'Failed to initialize WalletConnect',
      });
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      init();
    }
  }, [initialized, init]);

  return initialized;
};
