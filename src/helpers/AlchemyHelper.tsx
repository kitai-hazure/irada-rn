import {
  Alchemy,
  AssetTransfersCategory,
  AssetTransfersResponse,
  BigNumber,
  Network,
  OwnedToken,
  SortingOrder,
} from 'alchemy-sdk';
import type {TransactionRequest} from '@ethersproject/abstract-provider';
import {ethers} from 'ethers';
import {
  CHAINS,
  CHAIN_LIST,
  CONSTANTS,
  ENV,
  getChainFromAlchemyNetwork,
} from '../config';

type AlchemyHelperTypes = {
  alchemy: Alchemy;
  network: Network;
  init: (chainId: string) => Promise<void>;
  getTransfersFrom: (params: {
    address?: string;
  }) => Promise<AssetTransfersResponse>;
  getTransfersTo: (params: {
    address?: string;
  }) => Promise<AssetTransfersResponse>;
  getTokenBalances: (params: {address?: string}) => Promise<OwnedToken[]>;
  getNativeCurrencyBalance: (params: {
    address?: string;
  }) => Promise<string | undefined>;
  getBalances: (params: {address?: string}) => Promise<OwnedToken[]>;
  estimateGas: (transaction: TransactionRequest) => Promise<BigNumber>;
  getGasPrice: () => Promise<BigNumber>;
  getProvider: () => ethers.providers.Provider;
};

export const AlchemyHelper: AlchemyHelperTypes = {
  network: Network.ETH_SEPOLIA,

  alchemy: new Alchemy({
    apiKey: ENV.ALCHEMY_KEY,
    network: Network.ETH_SEPOLIA,
  }),

  async init(chainId: string) {
    AlchemyHelper.alchemy = new Alchemy({
      apiKey: ENV.ALCHEMY_KEY,
      network: CHAINS[chainId].network,
    });
    AlchemyHelper.network = CHAINS[chainId].network;
  },

  async getTransfersFrom({address}) {
    if (!address) {
      return {transfers: []};
    }
    return await AlchemyHelper.alchemy.core.getAssetTransfers({
      category: [
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.ERC1155,
      ],
      fromAddress: address,
      order: SortingOrder.DESCENDING,
      excludeZeroValue: true,
    });
  },

  async getTransfersTo({address}) {
    if (!address) {
      return {transfers: []};
    }
    return await AlchemyHelper.alchemy.core.getAssetTransfers({
      category: [
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.ERC1155,
      ],
      toAddress: address,
      order: SortingOrder.DESCENDING,
      excludeZeroValue: true,
    });
  },

  async getTokenBalances({address}) {
    if (!address) {
      return [];
    }
    const data = await AlchemyHelper.alchemy.core.getTokensForOwner(address);
    return data.tokens;
  },

  async getNativeCurrencyBalance({address}) {
    if (!address) {
      return undefined;
    }
    const balance = await AlchemyHelper.alchemy.core.getBalance(address);
    return balance._hex;
  },

  async getBalances({address}) {
    const nativeBalance = await AlchemyHelper.getNativeCurrencyBalance({
      address,
    });
    const tokenBalances = await AlchemyHelper.getTokenBalances({address});
    const chain = CHAIN_LIST.find(c => c.network === AlchemyHelper.network);
    if (chain) {
      tokenBalances.push({
        contractAddress: CONSTANTS.ZERO_ADDRESS,
        balance: nativeBalance,
        decimals: chain.nativeCurrency.decimals,
        name: chain.nativeCurrency.name,
        logo: chain.nativeCurrency.image,
        symbol: chain.nativeCurrency.symbol,
      });
    }
    return tokenBalances;
  },

  async estimateGas(transaction) {
    return await AlchemyHelper.alchemy.core.estimateGas(transaction);
  },

  async getGasPrice() {
    return await AlchemyHelper.alchemy.core.getGasPrice();
  },

  getProvider() {
    const chain = getChainFromAlchemyNetwork(AlchemyHelper.network);
    return new ethers.providers.JsonRpcProvider(chain?.rpcUrl);
  },
};
