import {ALCHEMY_KEY} from '@env';
import {
  Alchemy,
  AssetTransfersCategory,
  AssetTransfersResponse,
  Network,
  SortingOrder,
  TokenMetadataResponse,
} from 'alchemy-sdk';

export type TokenData = {
  balance: string;
  metadata: TokenMetadataResponse;
  address: string;
};

type AlchemyHelperTypes = {
  alchemy: Alchemy;
  init: (network: Network) => Promise<void>;
  getTransfersFrom: (params: {
    address?: string;
  }) => Promise<AssetTransfersResponse>;
  getTransfersTo: (params: {
    address?: string;
  }) => Promise<AssetTransfersResponse>;
  getTokenBalances: (params: {address?: string}) => Promise<TokenData[]>;
};

export const AlchemyHelper: AlchemyHelperTypes = {
  alchemy: new Alchemy({
    apiKey: ALCHEMY_KEY,
    network: Network.ETH_MAINNET,
  }),

  async init(network: Network) {
    AlchemyHelper.alchemy = new Alchemy({
      apiKey: ALCHEMY_KEY,
      network,
    });
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
    const balances = await AlchemyHelper.alchemy.core.getTokenBalances(address);
    const nonZeroBalances = balances.tokenBalances.filter(token => {
      return (
        token.tokenBalance !==
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      );
    });
    console.log('nonZeroBalances', nonZeroBalances);

    const tokensData: TokenData[] = [];

    for (let token of nonZeroBalances) {
      if (!token || !token.tokenBalance) {
        continue;
      }
      let balance = parseInt(token.tokenBalance, 16);
      const metadata = await AlchemyHelper.alchemy.core.getTokenMetadata(
        token.contractAddress,
      );
      if (!metadata.decimals) {
        continue;
      }
      balance = balance / Math.pow(10, metadata.decimals);
      balance.toFixed(2);
      tokensData.push({
        balance: balance.toString(),
        metadata,
        address: token.contractAddress,
      });
    }
    return tokensData;
  },
};
