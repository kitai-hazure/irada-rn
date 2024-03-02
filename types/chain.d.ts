export type SupportedChains = 'Ethereum' | 'Polygon';
export type SupportedCurrenciesCommon = 'USDC' | 'DAI' | 'USDT' | 'UNI';
export type SupportedCurrenciesEthereum = 'ETH' | SupportedCurrenciesCommon;
export type SupportedCurrenciesPolygon = 'MATIC' | SupportedCurrenciesCommon;
export type SupportedCurrencies =
  | SupportedCurrenciesEthereum
  | SupportedCurrenciesPolygon;
