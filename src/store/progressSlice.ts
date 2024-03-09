import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {REDUX_STORE} from '../config';

type ProgressSliceData = {
  isFirstLogin: boolean;
  hasWalletCreated: boolean;
};

const initialState: ProgressSliceData = {
  isFirstLogin: true,
  hasWalletCreated: false,
};

const progressSlice = createSlice({
  name: REDUX_STORE.PROGRESS,
  initialState,
  reducers: {
    setIsFirstLogin: (state, action: PayloadAction<boolean>) => {
      state.isFirstLogin = action.payload;
    },
    setHasWalletCreated: (state, action: PayloadAction<boolean>) => {
      state.hasWalletCreated = action.payload;
    },
  },
});

export const selectIsFirstLogin = (state: {[key: string]: ProgressSliceData}) =>
  state[REDUX_STORE.PROGRESS].isFirstLogin;
export const selectHasWalletCreated = (state: {
  [key: string]: ProgressSliceData;
}) => state[REDUX_STORE.PROGRESS].hasWalletCreated;

export const {setIsFirstLogin, setHasWalletCreated} = progressSlice.actions;

export default progressSlice.reducer;
