import {useCallback, useEffect, useState} from 'react';
import {createWeb3Wallet} from '../config';

export default function useInitialization() {
  const [initialized, setInitialized] = useState(false);

  const init = useCallback(async () => {
    try {
      // SettingsStore.setEIP155Address(eip155Addresses[0]);
      await createWeb3Wallet();
      setInitialized(true);
    } catch (err: unknown) {}
  }, []);

  useEffect(() => {
    if (!initialized) {
      init();
    }
  }, [initialized, init]);

  return initialized;
}
