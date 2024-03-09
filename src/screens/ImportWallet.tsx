import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../config';
import {
  GestureButton,
  IradaButton,
  MnemonicInput,
  OnboardingWrapper,
} from '../components';
import {useThemedStyles} from '../hooks';
import {KeychainHelper, MnemonicHelper} from '../helpers';
import {AppNavigatorRoutes, StackNavigationProps} from '../../types/navigation';
import {useDispatch} from 'react-redux';
import {
  setHasWalletCreated,
  setIsFirstLogin,
  setCurrentPrivateKey,
  setMnemonic,
  setAccounts,
} from '../store';
import {CommonActions} from '@react-navigation/native';
import {Wallet} from 'ethers';

export const ImportWallet = ({
  navigation,
}: StackNavigationProps<AppNavigatorRoutes, 'ImportWallet'>) => {
  const [values, setValues] = useState(Array(12));
  const [loading, setLoading] = useState(false);
  const themedStyles = useThemedStyles(styles);
  const dispatch = useDispatch();

  const handleImportWallet = async () => {
    const phrase = values.join(' ');
    const isValid = MnemonicHelper.isValidMnemonic(phrase);
    if (!isValid) {
      // TODO: show toast
      console.error('Invalid Mnemonic', phrase);
      return;
    } else {
      setLoading(true);
      const {privateKey} = await MnemonicHelper.createWallet(phrase);
      await KeychainHelper.set({mnemonic: phrase, privateKey, accountCount: 1});
      dispatch(setCurrentPrivateKey(privateKey));
      dispatch(setMnemonic(phrase));
      dispatch(setIsFirstLogin(false));
      dispatch(setHasWalletCreated(true));
      dispatch(
        setAccounts([
          {address: new Wallet(privateKey).address, privateKey: privateKey},
        ]),
      );
      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    }
  };

  return (
    <ScrollView
      removeClippedSubviews={false}
      style={themedStyles.scrollView}
      contentContainerStyle={themedStyles.contentContainer}>
      <OnboardingWrapper>
        <View style={themedStyles.container}>
          <Text style={themedStyles.headerTxt}>
            Enter your 12-word recovery phrase to import your wallet.
          </Text>
          <MnemonicInput values={values} setValues={setValues} />
          <GestureButton>
            <IradaButton
              color="purple"
              onPress={handleImportWallet}
              disabled={loading}>
              {!loading ? (
                'Import Wallet'
              ) : (
                <ActivityIndicator size="small" color="white" />
              )}
            </IradaButton>
          </GestureButton>
        </View>
      </OnboardingWrapper>
    </ScrollView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
    },
    headerTxt: {
      color: theme.text,
      textAlign: 'center',
      fontSize: 20,
    },
  });