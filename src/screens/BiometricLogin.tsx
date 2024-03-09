import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {GestureButton, IradaButton, OnboardingWrapper} from '../components';
import {AppNavigatorRoutes, StackNavigationProps} from '../../types/navigation';
import {useThemedStyles} from '../hooks';
import {
  KeychainHelper,
  KeychainPasswordOptions,
  MnemonicHelper,
} from '../helpers';
import Animated, {FadeInUp} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import {setAccounts, setCurrentPrivateKey, setMnemonic} from '../store';
import {Wallet} from 'ethers';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const BiometricLogin = ({
  navigation,
}: StackNavigationProps<AppNavigatorRoutes, 'BiometricLogin'>) => {
  const themedStyles = useThemedStyles(styles);
  const dispatch = useDispatch();

  const fillAccountData = useCallback(
    async ({accountCount, mnemonic}: KeychainPasswordOptions) => {
      const keys = await MnemonicHelper.createMultipleWallets(
        mnemonic,
        accountCount || 1,
      );
      const wallets = [];
      for (const wallet of keys) {
        wallets.push({
          privateKey: wallet.privateKey,
          address: new Wallet(wallet.privateKey).address,
        });
      }
      dispatch(setAccounts(wallets));
    },
    [dispatch],
  );

  const setup = useCallback(async () => {
    try {
      const values = await KeychainHelper.get();
      if (values && values.password) {
        const password = JSON.parse(values.password);
        if (password && password.privateKey) {
          dispatch(setCurrentPrivateKey(password.privateKey));
          dispatch(setMnemonic(password.mnemonic));
          fillAccountData(password);
          // Move on with current password set while the other data loads
          navigation.replace('Main');
        }
      }
    } catch (err) {}
  }, [dispatch, navigation, fillAccountData]);

  useEffect(() => {
    setup();
  }, [setup]);

  return (
    <OnboardingWrapper>
      <Animated.View
        entering={FadeInUp.duration(750)}
        style={themedStyles.container}>
        <View style={themedStyles.animation}>
          <LottieView
            source={require('../../assets/animations/biometric.json')}
            style={{
              width: width * 0.75,
              height: height * 0.5,
            }}
            autoPlay
            loop
          />
        </View>
        <GestureButton>
          <IradaButton color="white" textColor="black" onPress={setup}>
            Retry Biometric
          </IradaButton>
        </GestureButton>
      </Animated.View>
    </OnboardingWrapper>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
    },
    animation: {
      alignSelf: 'center',
    },
  });
