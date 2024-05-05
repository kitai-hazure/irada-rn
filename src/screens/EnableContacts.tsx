import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useThemedStyles} from '../hooks';
import {AppNavigatorRoutes, StackNavigationProps} from '../../types/navigation';
import {Theme} from '../config';
import {GestureButton, IradaButton, OnboardingWrapper} from '../components';
import {PERMISSIONS, request} from 'react-native-permissions';
import LottieView from 'lottie-react-native';
import {ToastHelper} from '../helpers';

const EnableContactsScreen = ({
  navigation,
}: StackNavigationProps<AppNavigatorRoutes, 'EnableContacts'>) => {
  const themedStyles = useThemedStyles(styles);
  const [buttonTitle, setButtonTitle] = useState('Enable Contacts');

  const handleEnableContacts = async () => {
    const res = await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.READ_CONTACTS
        : PERMISSIONS.IOS.CONTACTS,
      {
        message: 'Irada would like to access your contacts',
        title: 'Contacts',
        buttonPositive: 'Allow',
      },
    );
    if (res === 'granted') {
      navigation.navigate('Login');
    } else if (res === 'blocked') {
      setButtonTitle('Please enable contacts from settings');
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2:
          'Permission denied, please allow access to contacts from settings',
      });
    } else {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'Permission denied, please allow access to contacts',
      });
    }
  };

  return (
    <OnboardingWrapper>
      <View style={themedStyles.hero}>
        <Text style={themedStyles.title}>Enable Contacts</Text>
        <Text style={themedStyles.subtitle}>
          To enable Irada to help you with your contacts, we need your
          permission. Irada uses your contacts to save and retrieve your saved
          wallet addresses. None of your data leaves your device.
        </Text>
        <LottieView
          autoPlay
          loop
          source={require('../../assets/animations/contacts.json')}
          style={themedStyles.animation}
        />
      </View>
      <View style={themedStyles.buttonContainer}>
        <GestureButton>
          <IradaButton color="purple" onPress={handleEnableContacts}>
            {buttonTitle}
          </IradaButton>
        </GestureButton>
      </View>
    </OnboardingWrapper>
  );
};

export const EnableContacts = React.memo(EnableContactsScreen);

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
    animation: {
      marginTop: 32,
      width: 250,
      height: 250,
    },
  });
