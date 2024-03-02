import {DEV} from '@env';
import {
  SupportedChains,
  SupportedCurrenciesEthereum,
  SupportedCurrenciesPolygon,
} from '../../types/chain';

type CurrencyHelperMap = {
  [key in SupportedChains]: {
    [key2 in key extends 'Ethereum'
      ? SupportedCurrenciesEthereum
      : SupportedCurrenciesPolygon]: string;
  };
};

export const CurrencyHelper: CurrencyHelperMap = DEV
  ? {
      Ethereum: {
        DAI: '',
        ETH: '',
        UNI: '',
        USDC: '',
        USDT: '',
      },
      Polygon: {
        DAI: '',
        MATIC: '',
        UNI: '',
        USDC: '',
        USDT: '',
      },
    }
  : {
      Ethereum: {
        DAI: '',
        ETH: '',
        UNI: '',
        USDC: '',
        USDT: '',
      },
      Polygon: {
        DAI: '',
        MATIC: '',
        UNI: '',
        USDC: '',
        USDT: '',
      },
    };
