import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {REDUX_STORE} from '../config';
import type {Web3WalletTypes} from '@walletconnect/web3wallet';
import type {ProposalTypes, Verify, SessionTypes} from '@walletconnect/types';

type SetSessionProposalModalOptions = {
  isOpen: boolean;
} & Web3WalletTypes.SessionProposal;

type SetSessionRequestModalOptions = {
  isOpen: boolean;
  requestEvent: Web3WalletTypes.SessionRequest;
  requestSession: SessionTypes.Struct;
};

type ModalSliceData = {
  sessionProposal: {
    isOpen: boolean;
    params?: ProposalTypes.Struct;
    id?: number;
    verifyContext?: Verify.Context;
  };
  mnemonicReveal: {isOpen: boolean};
  sessionSign: {
    isOpen: boolean;
    requestEvent?: Web3WalletTypes.SessionRequest;
    requestSession?: SessionTypes.Struct;
  };
  sessionSignTypedData: {
    isOpen: boolean;
    requestEvent?: Web3WalletTypes.SessionRequest;
    requestSession?: SessionTypes.Struct;
  };
  sessionSignTransaction: {
    isOpen: boolean;
    requestEvent?: Web3WalletTypes.SessionRequest;
    requestSession?: SessionTypes.Struct;
  };
  sessionSendTransaction: {
    isOpen: boolean;
    requestEvent?: Web3WalletTypes.SessionRequest;
    requestSession?: SessionTypes.Struct;
  };
};

const initialState: ModalSliceData = {
  sessionProposal: {isOpen: false},
  mnemonicReveal: {isOpen: false},
  sessionSign: {isOpen: false},
  sessionSignTypedData: {isOpen: false},
  sessionSignTransaction: {isOpen: false},
  sessionSendTransaction: {isOpen: false},
};

const progressSlice = createSlice({
  name: REDUX_STORE.MODALS,
  initialState,
  reducers: {
    openProposalModal: (
      state,
      action: PayloadAction<SetSessionProposalModalOptions>,
    ) => {
      state.sessionProposal = action.payload;
    },
    openSignModal: (
      state,
      action: PayloadAction<SetSessionRequestModalOptions>,
    ) => {
      state.sessionSign = action.payload;
    },
    openSignTypedDataModal: (
      state,
      action: PayloadAction<SetSessionRequestModalOptions>,
    ) => {
      state.sessionSignTypedData = action.payload;
    },
    openSignTransactionModal: (
      state,
      action: PayloadAction<SetSessionRequestModalOptions>,
    ) => {
      state.sessionSignTransaction = action.payload;
    },
    openSendTransactionModal: (
      state,
      action: PayloadAction<SetSessionRequestModalOptions>,
    ) => {
      state.sessionSendTransaction = action.payload;
    },
    setMnemonicProposalModal: (state, action: PayloadAction<boolean>) => {
      state.mnemonicReveal.isOpen = action.payload;
    },
    closeProposalModal: state => {
      state.sessionProposal = {isOpen: false};
    },
    closeSignModal: state => {
      state.sessionSign = {isOpen: false};
    },
    closeSignTypedDataModal: state => {
      state.sessionSignTypedData = {isOpen: false};
    },
    closeSignTransactionModal: state => {
      state.sessionSignTransaction = {isOpen: false};
    },
    closeSendTransactionModal: state => {
      state.sessionSendTransaction = {isOpen: false};
    },
    clearModalData: state => {
      state.sessionProposal = initialState.sessionProposal;
      state.mnemonicReveal = initialState.mnemonicReveal;
    },
  },
});

export const selectProposalModal = (state: {[key: string]: ModalSliceData}) =>
  state[REDUX_STORE.MODALS].sessionProposal;
export const selectMnemonicModal = (state: {[key: string]: ModalSliceData}) =>
  state[REDUX_STORE.MODALS].mnemonicReveal;
export const selectSignModal = (state: {[key: string]: ModalSliceData}) =>
  state[REDUX_STORE.MODALS].sessionSign;
export const selectSignTypedDataModal = (state: {
  [key: string]: ModalSliceData;
}) => state[REDUX_STORE.MODALS].sessionSignTypedData;
export const selectSignTransactionModal = (state: {
  [key: string]: ModalSliceData;
}) => state[REDUX_STORE.MODALS].sessionSignTransaction;
export const selectSendTransactionModal = (state: {
  [key: string]: ModalSliceData;
}) => state[REDUX_STORE.MODALS].sessionSendTransaction;

export const {
  openProposalModal,
  closeProposalModal,
  clearModalData,
  setMnemonicProposalModal,
  openSignModal,
  closeSignModal,
  openSignTypedDataModal,
  closeSignTypedDataModal,
  openSignTransactionModal,
  closeSignTransactionModal,
  openSendTransactionModal,
  closeSendTransactionModal,
} = progressSlice.actions;

export default progressSlice.reducer;
