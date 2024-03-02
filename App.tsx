import React from 'react';
import {WalletConnectModal} from '@walletconnect/modal-react-native';
import {walletconnectProps} from './src/config';
import AppNavigator from './src/navigation';
import {StatusBar, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import store from './src/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient();
const persistor = persistStore(store);

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <WalletConnectModal {...walletconnectProps} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={styles.container}>
              <AppNavigator />
            </GestureHandlerRootView>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
