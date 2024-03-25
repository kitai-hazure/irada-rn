import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {REDUX_STORE} from '../config';
import {CurrencyDropdownType} from '../components';
import {TimeUnit} from '@notifee/react-native';

export type ScheduledTransaction = {
  id: string;
  from: string;
  to: string;
  amount: string;
  currency: CurrencyDropdownType;
  chain: string;
  start: string;
  repeatsEvery: number;
  timeUnit: TimeUnit;
  description: string;
};

type TransactionSliceData = {
  scheduledTransactions: Array<ScheduledTransaction>;
};

const initialState: TransactionSliceData = {
  scheduledTransactions: [],
};

const transactionSlice = createSlice({
  name: REDUX_STORE.TRANSACTION,
  initialState,
  reducers: {
    addScheduledTransaction: (
      state,
      action: PayloadAction<ScheduledTransaction>,
    ) => {
      state.scheduledTransactions.push(action.payload);
    },
    removeScheduledTransaction: (state, action: PayloadAction<string>) => {
      state.scheduledTransactions = state.scheduledTransactions.filter(
        tx => tx.id !== action.payload,
      );
    },
    clearScheduledTransactions: state => {
      state.scheduledTransactions = [];
    },
  },
});

export const selectScheduledTransactions = (state: {
  [key: string]: TransactionSliceData;
}) => state[REDUX_STORE.TRANSACTION].scheduledTransactions;

export const {
  addScheduledTransaction,
  clearScheduledTransactions,
  removeScheduledTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
