import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {REDUX_STORE} from '../config';
import type {Web3WalletTypes} from '@walletconnect/web3wallet';
import type {ProposalTypes, Verify, SessionTypes} from '@walletconnect/types';
import {ScheduledTransaction} from './transactionSlice';
import {CurrencyDropdownType} from '../components';
import {Contact} from 'expo-contacts';

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
  createScheduledTransaction: {
    isOpen: boolean;
  };
  sendTokens: {
    isOpen: boolean;
    transaction?: {
      amount: string;
      currency: CurrencyDropdownType;
      to: Contact;
    };
  };
  sendTokensScheduled: {
    isOpen: boolean;
    scheduledTransaction?: ScheduledTransaction;
  };
  addAddressToContactModal: {
    isOpen: boolean;
    contact?: Contact;
  };
  createContactModal: {
    isOpen: boolean;
  };
};

const initialState: ModalSliceData = {
  sessionProposal: {isOpen: false},
  mnemonicReveal: {isOpen: false},
  sessionSign: {isOpen: false},
  sessionSignTypedData: {isOpen: false},
  sessionSignTransaction: {isOpen: false},
  sessionSendTransaction: {isOpen: false},
  createScheduledTransaction: {isOpen: false},
  sendTokens: {isOpen: false},
  sendTokensScheduled: {isOpen: false},
  addAddressToContactModal: {isOpen: false},
  createContactModal: {isOpen: false},
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
    openCreateScheduledTransactionModal: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.createScheduledTransaction.isOpen = action.payload;
    },
    openSendTokensModal: (
      state,
      action: PayloadAction<ModalSliceData['sendTokens']>,
    ) => {
      state.sendTokens = action.payload;
    },
    openSendTokensScheduledModal: (
      state,
      action: PayloadAction<ModalSliceData['sendTokensScheduled']>,
    ) => {
      state.sendTokensScheduled = action.payload;
    },
    openAddAddressToContactModal: (
      state,
      action: PayloadAction<ModalSliceData['addAddressToContactModal']>,
    ) => {
      state.addAddressToContactModal = action.payload;
    },
    openCreateContactModal: (
      state,
      action: PayloadAction<ModalSliceData['createContactModal']>,
    ) => {
      state.createContactModal = action.payload;
    },
    openMnemonicModal: (state, action: PayloadAction<boolean>) => {
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
    closeCreateScheduledTransactionModal: state => {
      state.createScheduledTransaction = {isOpen: false};
    },
    closeSendTokensModal: state => {
      state.sendTokens = {isOpen: false};
    },
    closeSendTokensScheduledModal: state => {
      state.sendTokensScheduled = {isOpen: false};
    },
    closeMnemonicModal: state => {
      state.mnemonicReveal = {isOpen: false};
    },
    closeAddAddressToContactModal: state => {
      state.addAddressToContactModal = {isOpen: false};
    },
    closeCreateContactModal: state => {
      state.createContactModal = {isOpen: false};
    },
    clearModalData: state => {
      state = initialState;
      return state;
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
export const selectCreateScheduledTransactionModal = (state: {
  [key: string]: ModalSliceData;
}) => state[REDUX_STORE.MODALS].createScheduledTransaction;
export const selectSendTokensModal = (state: {[key: string]: ModalSliceData}) =>
  state[REDUX_STORE.MODALS].sendTokens;
export const selectSendTokensScheduledModal = (state: {
  [key: string]: ModalSliceData;
}) => state[REDUX_STORE.MODALS].sendTokensScheduled;
export const selectAddAddressToContactModal = (state: {
  [key: string]: ModalSliceData;
}) => state[REDUX_STORE.MODALS].addAddressToContactModal;
export const selectCreateContactModal = (state: {
  [key: string]: ModalSliceData;
}) => state[REDUX_STORE.MODALS].createContactModal;

export const {
  openProposalModal,
  closeProposalModal,
  clearModalData,
  openMnemonicModal,
  closeMnemonicModal,
  openSignModal,
  closeSignModal,
  openSignTypedDataModal,
  closeSignTypedDataModal,
  openSignTransactionModal,
  closeSignTransactionModal,
  openSendTransactionModal,
  closeSendTransactionModal,
  openCreateScheduledTransactionModal,
  closeCreateScheduledTransactionModal,
  openSendTokensModal,
  closeSendTokensModal,
  openSendTokensScheduledModal,
  closeSendTokensScheduledModal,
  openAddAddressToContactModal,
  closeAddAddressToContactModal,
  openCreateContactModal,
  closeCreateContactModal,
} = progressSlice.actions;

export default progressSlice.reducer;
