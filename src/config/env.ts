import {WALLET_CONNECT_PROJECT_ID, DEV} from '@env';

export const ENV = {
  WALLET_CONNECT_PROJECT_ID,
  CHAIN_ID: DEV ? 11155111 : 1,
};
