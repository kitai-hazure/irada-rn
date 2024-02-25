import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useWeb3Modal} from '@web3modal/ethers5-react-native';
import {useWallet} from '../hooks';
import {AppNavigatorRoutes, StackNavigationProps} from '../../types/navigation';

export const Login = ({
  navigation,
}: StackNavigationProps<AppNavigatorRoutes, 'Login'>) => {
  const {open} = useWeb3Modal();
  const {isLoggedIn} = useWallet();

  useEffect(() => {
    if (isLoggedIn) {
      console.log('isLoggedIn', isLoggedIn);
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }
  }, [isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => open()}>
        <Text>Connect wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
