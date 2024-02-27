import React from 'react';
import {WalletConnectModal} from '@walletconnect/modal-react-native';
import {linking, walletconnectProps} from './src/config';
import AppNavigator from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import store from './src/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

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
      <WalletConnectModal {...walletconnectProps} />
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
