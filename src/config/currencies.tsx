import {SupportedChains, SupportedCurrencies} from '../../types/chain';

export const supportedCurrencies = (
  chain: SupportedChains,
): SupportedCurrencies[] => {
  if (chain === 'Ethereum') {
    return ['USDC', 'DAI', 'USDT', 'UNI', 'ETH'];
  } else {
    return ['USDC', 'DAI', 'USDT', 'UNI', 'MATIC'];
  }
};
