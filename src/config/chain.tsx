export type Chain = {
  name: string;
  chainId: string;
  image: string;
  blockExplorerUrl: string;
};

export const CHAINS: {
  [chainId: string]: Chain;
} = {
  11155111: {
    name: 'Ethereum Sepolia',
    chainId: '11155111',
    blockExplorerUrl: 'https://sepolia.etherscan.io/',
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  },
  80001: {
    name: 'Polygon Mumbai',
    chainId: '80001',
    blockExplorerUrl: 'https://mumbai.polygonscan.com/',
    image: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
  },
};

export const CHAIN_LIST = Object.values(CHAINS);
