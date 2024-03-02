import '@walletconnect/react-native-compat';
import '@ethersproject/shims';
import {ENV} from './env';
import {Props} from '@walletconnect/modal-react-native/src/modal/wcm-modal';
import Clipboard from '@react-native-clipboard/clipboard';
import Haptics from 'expo-haptics';
import {Core} from '@walletconnect/core';
import {IWeb3Wallet, Web3Wallet} from '@walletconnect/web3wallet';

export const EIP155_SIGNING_METHODS = {
  // Signing
  ETH_SIGN: 'eth_sign',
  PERSONAL_SIGN: 'personal_sign',
  // Typed Data
  ETH_SIGN_TYPED_DATA: 'eth_signTypedData',
  ETH_SIGN_TYPED_DATA_V3: 'eth_signTypedData_v3',
  ETH_SIGN_TYPED_DATA_V4: 'eth_signTypedData_v4',
  // Transactions
  ETH_SEND_TRANSACTION: 'eth_sendTransaction',
  ETH_SIGN_TRANSACTION: 'eth_signTransaction',
};

export const WC_EVENTS = {
  CHAIN_CHANGED: 'chainChanged',
  ACCOUNTS_CHANGED: 'accountsChanged',
};

export const wcChains = ENV.CHAIN_IDS.map(id => `eip155:${id}`);
export const wcEvents = Object.values(WC_EVENTS);
export const wcMethods = Object.values(EIP155_SIGNING_METHODS);
export const wcAccounts = (wallets: string[]) => {
  return wallets
    .map(wallet => wcChains.map(chain => `${chain}:${wallet}`))
    .flat();
};

export const walletconnectProps: Props = {
  projectId: ENV.WALLET_CONNECT_PROJECT_ID,
  providerMetadata: {
    name: 'Irada',
    description: 'Your web3 wallet and assistant',
    url: 'www.walletconnect.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
    redirect: {
      native: 'irada://',
    },
  },
  themeMode: 'dark',
  onCopyClipboard: text => {
    Clipboard.setString(text);
    Haptics.impactAsync();
  },
  sessionParams: {
    namespaces: {
      eip155: {
        chains: wcChains,
        events: wcEvents,
        methods: wcMethods,
        rpcMap: {},
        defaultChain: `eip155:${ENV.CHAIN_IDS[0]}`,
      },
    },
  },
};

export let web3wallet: IWeb3Wallet;

export const createWeb3Wallet = async () => {
  const core = new Core({
    projectId: ENV.WALLET_CONNECT_PROJECT_ID,
  });

  web3wallet = await Web3Wallet.init({
    core: core,
    metadata: {
      name: 'Irada Wallet',
      description: 'Your web3 wallet and assistant',
      url: 'www.walletconnect.com',
      icons: ['https://avatars.githubusercontent.com/u/37784886'],
    },
  });
};
