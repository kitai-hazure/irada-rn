import '@walletconnect/react-native-compat';
import '@ethersproject/shims';

import React from 'react';
import AppNavigator from './src/navigation';
import {StatusBar, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import store from './src/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Modals} from './src/components';
import {toastConfig} from './src/config';

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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={styles.container}>
              <AppNavigator />
              <Modals />
            </GestureHandlerRootView>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
