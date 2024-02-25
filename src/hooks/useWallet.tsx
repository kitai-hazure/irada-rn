import {useMemo} from 'react';
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers5-react-native';
import {ethers} from 'ethers';

export const useWallet = () => {
  const {walletProvider} = useWeb3ModalProvider();
  const {address, isConnected} = useWeb3ModalAccount();

  const provider = useMemo(() => {
    if (walletProvider) {
      return new ethers.providers.Web3Provider(walletProvider);
    }
  }, [walletProvider]);

  return {provider, isLoggedIn: isConnected, address};
};
