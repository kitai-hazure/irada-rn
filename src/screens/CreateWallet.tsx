import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Theme} from '../config';
import {
  GestureButton,
  IradaButton,
  MnemonicInput,
  OnboardingWrapper,
} from '../components';
import {useThemedStyles} from '../hooks';
import {KeychainHelper, MnemonicHelper, ToastHelper} from '../helpers';
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
import {CHAIN_LIST} from '../config/chain';

export const CreateWallet = ({
  navigation,
}: StackNavigationProps<AppNavigatorRoutes, 'CreateWallet'>) => {
  const [phrase, setPhrase] = useState<string>();
  const [values, setValues] = useState(Array(12));
  const [loading, setLoading] = useState(false);
  const themedStyles = useThemedStyles(styles);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const {seed} = MnemonicHelper.generateMnemonic();
      setValues(seed.split(' '));
      setPhrase(seed);
    } catch {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'Failed to generate mnemonic',
      });
    }
  }, []);

  const handleSavedPhrase = async () => {
    if (phrase) {
      setLoading(true);
      try {
        const {privateKey} = await MnemonicHelper.createWallet(phrase);
        await KeychainHelper.set({
          mnemonic: phrase,
          privateKey,
          accountCount: 1,
          chainId: CHAIN_LIST[0].chainId,
        });
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
      } catch (error) {
        setTimeout(() => handleSavedPhrase(), 500);
      }
    }
  };

  return (
    <ScrollView
      removeClippedSubviews={false}
      style={themedStyles.scrollView}
      contentContainerStyle={themedStyles.contentContainer}>
      <OnboardingWrapper>
        <View style={themedStyles.container}>
          <View>
            <Text style={themedStyles.headerTxt}>
              Please save this 12-word recovery phrase in a safe place.
            </Text>
            <Text style={themedStyles.subTxt}>
              This phrase is the only way to recover your wallet. If you loose
              the recovery phrase, you will loose access to your funds and we
              cannot help you recover them. If someone else gets access to your
              recovery phrase, they can steal your funds.
            </Text>
          </View>
          <MnemonicInput
            values={values}
            setValues={setValues}
            editable={false}
          />
          <GestureButton>
            <IradaButton
              color="purple"
              onPress={handleSavedPhrase}
              disabled={loading}>
              {!loading ? (
                'I saved my recovery phrase'
              ) : (
                <ActivityIndicator color="white" size="small" />
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
    subTxt: {
      color: theme.lightText,
      textAlign: 'center',
      fontSize: 14,
      marginTop: 8,
    },
  });
