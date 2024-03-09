import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {REDUX_STORE} from '../config';
import {Wallet} from 'ethers';
import {Chain, CHAIN_LIST, CHAINS} from '../config/chain';

type AccountSliceData = {
  mnemonic: string | undefined;
  currentPrivateKey: string | undefined;
  currentChainId: string | undefined;
  currentAccountIndex: number;
  accounts: Array<{privateKey: string; address: string}>;
  chains: Array<Chain>;
};

const initialState: AccountSliceData = {
  mnemonic: undefined,
  currentPrivateKey: undefined,
  currentChainId: undefined,
  currentAccountIndex: 0,
  accounts: [],
  chains: CHAIN_LIST,
};

const accountSlice = createSlice({
  name: REDUX_STORE.ACCOUNT,
  initialState,
  reducers: {
    setMnemonic: (state, action: PayloadAction<string>) => {
      state.mnemonic = action.payload;
    },
    setCurrentPrivateKey: (state, action: PayloadAction<string>) => {
      state.currentPrivateKey = action.payload;
    },
    setCurrentChainId: (state, action: PayloadAction<string>) => {
      state.currentChainId = action.payload;
    },
    setAccounts: (
      state,
      action: PayloadAction<AccountSliceData['accounts']>,
    ) => {
      state.accounts = action.payload;
    },
    addAccount: (
      state,
      action: PayloadAction<AccountSliceData['accounts'][0]>,
    ) => {
      state.accounts = [...state.accounts, action.payload];
    },
    setCurrentAccountIndex: (state, action: PayloadAction<number>) => {
      state.currentAccountIndex = action.payload;
    },
    clearAccountData: state => {
      state.accounts = [];
      state.currentPrivateKey = undefined;
      state.mnemonic = undefined;
      state.currentAccountIndex = 0;
    },
  },
});

export const selectCurrentPrivateKey = (state: {
  [key: string]: AccountSliceData;
}) => state[REDUX_STORE.ACCOUNT].currentPrivateKey;
export const selectCurrentAddress = (state: {
  [key: string]: AccountSliceData;
}) => {
  const currentPrivateKey = state[REDUX_STORE.ACCOUNT].currentPrivateKey;
  return currentPrivateKey ? new Wallet(currentPrivateKey).address : undefined;
};
export const isLoggedIn = (state: {[key: string]: AccountSliceData}) =>
  !!state[REDUX_STORE.ACCOUNT].currentPrivateKey;
export const selectAccounts = (state: {[key: string]: AccountSliceData}) =>
  state[REDUX_STORE.ACCOUNT].accounts;
export const selectMnemonic = (state: {[key: string]: AccountSliceData}) =>
  state[REDUX_STORE.ACCOUNT].mnemonic;
export const selectCurrentChainId = (state: {
  [key: string]: AccountSliceData;
}) => state[REDUX_STORE.ACCOUNT].currentChainId;
export const selectChains = (state: {[key: string]: AccountSliceData}) =>
  state[REDUX_STORE.ACCOUNT].chains;
export const selectCurrentChain = (state: {
  [key: string]: AccountSliceData;
}) => {
  const currentChainId = state[REDUX_STORE.ACCOUNT].currentChainId;
  return currentChainId ? CHAINS[currentChainId] : undefined;
};

export const {
  setAccounts,
  setCurrentPrivateKey,
  setMnemonic,
  addAccount,
  setCurrentAccountIndex,
  clearAccountData,
} = accountSlice.actions;

export default accountSlice.reducer;
