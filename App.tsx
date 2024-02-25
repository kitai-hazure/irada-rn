import React from 'react';
import {Web3Modal, createWeb3Modal} from '@web3modal/ethers5-react-native';
import {linking, walletconnectConfig} from './src/config';
import AppNavigator from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import store from './src/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

// Create a Web3Modal instance
createWeb3Modal(walletconnectConfig);

const queryClient = new QueryClient();
const persistor = persistStore(store);

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Web3Modal />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer linking={linking}>
              <AppNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
