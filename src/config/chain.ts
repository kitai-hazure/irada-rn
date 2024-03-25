import {Network} from 'alchemy-sdk';
import {ENV} from './env';

export type Chain = {
  name: string;
  chainId: string;
  image: string;
  blockExplorerUrl: string;
  rpcUrl: string;
  network: Network;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
    image: string;
  };
};

export const CHAINS: {
  [chainId: string]: Chain;
} = {
  11155111: {
    name: 'Ethereum Sepolia',
    chainId: '11155111',
    blockExplorerUrl: 'https://sepolia.etherscan.io/',
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${ENV.ALCHEMY_KEY}`,
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    network: Network.ETH_SEPOLIA,
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
  },
  80001: {
    name: 'Polygon Mumbai',
    chainId: '80001',
    blockExplorerUrl: 'https://mumbai.polygonscan.com/',
    rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${ENV.ALCHEMY_KEY}`,
    image: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    network: Network.MATIC_MUMBAI,
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
      image: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    },
  },
};

export const CHAIN_LIST = Object.values(CHAINS);

export const getChainFromAlchemyNetwork = (network: Network) => {
  return CHAIN_LIST.find(chain => chain.network === network);
};
