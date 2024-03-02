import {useMemo} from 'react';
import {ethers} from 'ethers';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';

export const useWallet = () => {
  const {
    address,
    isConnected,
    provider: walletProvider,
  } = useWalletConnectModal();

  const provider = useMemo(() => {
    if (walletProvider) {
      return new ethers.providers.Web3Provider(walletProvider);
    }
  }, [walletProvider]);

  const signer = useMemo(() => {
    if (provider) {
      return provider.getSigner();
    }
  }, [provider]);

  return {provider, isLoggedIn: isConnected, address, signer};
};
