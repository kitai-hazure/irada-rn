import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';

import {REDUX_STORE} from '../config';
import accountSlice from './accountSlice';
import contactSlice from './contactSlice';
import progressSlice from './progressSlice';
import modalSlice from './modalSlice';
import themeSlice from './themeSlice';
import transactionSlice from './transactionSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: [
    REDUX_STORE.CONTACT,
    REDUX_STORE.THEME,
    REDUX_STORE.PROGRESS,
    REDUX_STORE.TRANSACTION,
  ],
  blacklist: [REDUX_STORE.ACCOUNT, REDUX_STORE.MODALS],
};

const rootReducer = combineReducers({
  [REDUX_STORE.CONTACT]: contactSlice,
  [REDUX_STORE.THEME]: themeSlice,
  [REDUX_STORE.ACCOUNT]: accountSlice,
  [REDUX_STORE.PROGRESS]: progressSlice,
  [REDUX_STORE.MODALS]: modalSlice,
  [REDUX_STORE.TRANSACTION]: transactionSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
