import '@walletconnect/react-native-compat';
import '@ethersproject/shims';
import {ENV} from './env';
import {Props} from '@walletconnect/modal-react-native/src/modal/wcm-modal';
import Clipboard from '@react-native-clipboard/clipboard';
import Haptics from 'expo-haptics';

export const walletconnectProps: Props = {
  projectId: ENV.WALLET_CONNECT_PROJECT_ID || '',
  providerMetadata: {
    name: 'Irada',
    description: 'Your web3 assistant',
    url: 'https://web3modal.com',
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
        methods: ['personal_sign', 'eth_signTypedData', 'eth_signTypedData_v4'],
        chains: [`eip155:${ENV.CHAIN_ID}`],
        events: ['chainChanged', 'accountsChanged'],
        rpcMap: {},
      },
    },
  },
};
