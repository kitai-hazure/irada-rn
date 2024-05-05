import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useThemedStyles} from '../hooks';
import {AppNavigatorRoutes, StackNavigationProps} from '../../types/navigation';
import {Theme} from '../config';
import {GestureButton, IradaButton, OnboardingWrapper} from '../components';

const LoginScreen = ({
  navigation,
}: StackNavigationProps<AppNavigatorRoutes, 'Login'>) => {
  const themedStyles = useThemedStyles(styles);

  const navigateToCreateWallet = () => {
    navigation.navigate('CreateWallet');
  };

  const navigateToImportWallet = () => {
    navigation.navigate('ImportWallet');
  };

  return (
    <OnboardingWrapper>
      <View style={themedStyles.hero}>
        <Text style={themedStyles.title}>Irada Wallet</Text>
        <Text style={themedStyles.subtitle}>
          A secure and easy way to manage your assets with assistive features.
        </Text>
      </View>
      <View style={themedStyles.buttonContainer}>
        <GestureButton>
          <IradaButton color="orange" onPress={navigateToCreateWallet}>
            Create a new Wallet
          </IradaButton>
        </GestureButton>
        <GestureButton>
          <IradaButton color="purple" onPress={navigateToImportWallet}>
            Import existing Wallet
          </IradaButton>
        </GestureButton>
      </View>
    </OnboardingWrapper>
  );
};

export const Login = React.memo(LoginScreen);

const styles = (theme: Theme) =>
  StyleSheet.create({
    buttonContainer: {
      gap: 16,
    },
    hero: {
      flex: 0.9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: theme.text,
      textAlign: 'center',
      marginTop: 16,
    },
  });
