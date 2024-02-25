import '@walletconnect/react-native-compat';
import '@ethersproject/shims';

import {Web3ModalOptions, defaultConfig} from '@web3modal/ethers5-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {ENV} from './env';

const projectId = ENV.WALLET_CONNECT_PROJECT_ID || '';

const metadata = {
  name: 'Irada',
  description: 'Your web3 assistant',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'irada://',
  },
};

const config = defaultConfig({metadata});

const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/demo',
};

const chains = [sepolia];

export const walletconnectConfig: Web3ModalOptions = {
  projectId,
  chains,
  config,
  enableAnalytics: false,
  themeMode: 'dark',
  defaultChain: sepolia,
  clipboardClient: {
    setString: async (value: string) => {
      Clipboard.setString(value);
    },
  },
};
