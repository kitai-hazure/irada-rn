import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {CONSTANTS, Theme} from '../config';
import {useThemedStyles} from '../hooks';
import {
  AccountButton,
  ChainButton,
  DrawerLayout,
  GestureButton,
  Header,
} from '../components';
import {KeychainHelper, ToastHelper} from '../helpers';
import {useDispatch} from 'react-redux';
import {
  clearAccountData,
  clearContacts,
  clearModalData,
  openMnemonicModal,
  setHasWalletCreated,
  clearScheduledTransactions,
} from '../store';
import {
  DrawerNavigationProps,
  DrawerNavigatorRoutes,
} from '../../types/navigation';
import {CommonActions} from '@react-navigation/native';

export const Settings = ({
  navigation,
}: DrawerNavigationProps<DrawerNavigatorRoutes, 'Settings'>) => {
  const themedStyles = useThemedStyles(styles);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await KeychainHelper.reset();
      dispatch(clearAccountData());
      dispatch(clearContacts());
      dispatch(clearModalData());
      dispatch(clearScheduledTransactions());
      dispatch(setHasWalletCreated(false));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to clear data, please try again',
      });
    }
  };

  const handleRevealMnemonic = async () => {
    dispatch(openMnemonicModal(true));
  };

  return (
    <DrawerLayout>
      <Header title="Settings" />
      <ScrollView nestedScrollEnabled={true}>
        <View style={themedStyles.sectionContainer}>
          <Text style={themedStyles.sectionTitle}>Security</Text>
          <Text style={themedStyles.description}>
            Make sure no one else can see the your secret phrase before you
            reveal it
          </Text>
          <GestureButton>
            <Pressable
              onPress={handleRevealMnemonic}
              style={[themedStyles.button, themedStyles.buttonPurple]}>
              <Text style={themedStyles.buttonText}>Reveal Mnemonic</Text>
            </Pressable>
          </GestureButton>
        </View>
        <View style={themedStyles.sectionContainer}>
          <Text style={themedStyles.sectionTitle}>Chain</Text>
          <ChainButton />
        </View>
        <View style={themedStyles.sectionContainer}>
          <Text style={themedStyles.sectionTitle}>Accounts</Text>
          <AccountButton />
          <GestureButton>
            <Pressable
              onPress={handleLogout}
              style={[themedStyles.button, themedStyles.buttonRed]}>
              <Text style={themedStyles.buttonText}>
                Clear data and log out
              </Text>
            </Pressable>
          </GestureButton>
        </View>
        <View style={themedStyles.sectionContainer}>
          <Text style={themedStyles.sectionTitle}>Contact Us</Text>
          <View style={themedStyles.wrap}>
            <Text style={themedStyles.description}>
              If you have any questions, please contact us at
            </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`mailto:${CONSTANTS.CONTACT_US_EMAIL}`)
              }>
              <Text style={themedStyles.inlineButton}>
                {CONSTANTS.CONTACT_US_EMAIL}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </DrawerLayout>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    sectionTitle: {
      fontSize: 16,
      color: theme.text,
      marginBottom: 8,
    },
    subTitle: {
      fontSize: 14,
      marginBottom: 8,
      color: theme.purple,
    },
    sectionContainer: {
      marginTop: 16,
      backgroundColor: theme.container,
      padding: 16,
      borderRadius: 16,
    },
    description: {
      fontSize: 14,
      color: theme.text,
    },
    buttonText: {
      color: theme.text,
      fontSize: 14,
    },
    button: {
      opacity: 0.9,
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    buttonRed: {
      backgroundColor: theme.orange,
    },
    buttonPurple: {
      backgroundColor: theme.purple,
    },
    inlineButton: {
      color: theme.purple,
      alignSelf: 'center',
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    wrap: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
  });
