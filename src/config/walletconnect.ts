import {ENV} from './env';
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

export let web3wallet: IWeb3Wallet;

export const createWeb3Wallet = async () => {
  if (web3wallet !== undefined) {
    return;
  }

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
    name: 'Irada Wallet',
  });
};
