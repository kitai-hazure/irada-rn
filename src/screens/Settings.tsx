import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {CONSTANTS, Theme} from '../config';
import {useThemedStyles} from '../hooks';
import {
  AccountButton,
  ChainButton,
  DrawerLayout,
  GestureButton,
  Header,
  IradaButton,
  optimizeHeavyScreen,
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
  setIsFirstLogin,
} from '../store';
import {
  DrawerNavigationProps,
  DrawerNavigatorRoutes,
} from '../../types/navigation';
import {CommonActions} from '@react-navigation/native';

const SettingsScreen = ({
  navigation,
}: DrawerNavigationProps<DrawerNavigatorRoutes, 'Settings'>) => {
  const themedStyles = useThemedStyles(styles);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await KeychainHelper.reset();
      dispatch(clearAccountData());
      dispatch(clearContacts());
      dispatch(clearModalData());
      dispatch(clearScheduledTransactions());
      dispatch(setHasWalletCreated(false));
      dispatch(setIsFirstLogin(true));
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
    } finally {
      setLoading(false);
    }
  };

  const handleRevealMnemonic = async () => {
    dispatch(openMnemonicModal(true));
  };

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={themedStyles.sectionContainer}>
        <Text style={themedStyles.sectionTitle}>Security</Text>
        <Text style={themedStyles.description}>
          Make sure no one else can see the your secret phrase before you reveal
          it
        </Text>
        <GestureButton>
          <IradaButton
            textColor="white"
            color="purple"
            onPress={handleRevealMnemonic}
            style={themedStyles.button}>
            Reveal Mnemonic
          </IradaButton>
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
          <IradaButton
            textColor="white"
            color="orange"
            onPress={handleLogout}
            loading={loading}
            loaderColor="white"
            style={themedStyles.button}>
            Clear data and log out
          </IradaButton>
        </GestureButton>
      </View>
      <View style={themedStyles.sectionContainer}>
        <Text style={themedStyles.sectionTitle}>Contact Us</Text>
        <View style={themedStyles.wrap}>
          <Text style={themedStyles.description}>
            Currently, we are in alpha testing mode and hence only support
            testnets. If you have any questions, please contact us at
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
  );
};

const OptimizedSettings = optimizeHeavyScreen(SettingsScreen);

export const Settings = (
  props: DrawerNavigationProps<DrawerNavigatorRoutes, 'Settings'>,
) => (
  <>
    <DrawerLayout>
      <Header title="Settings" />
      <OptimizedSettings {...props} />
    </DrawerLayout>
  </>
);

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
      marginBottom: 16,
      backgroundColor: theme.container,
      padding: 16,
      borderRadius: 16,
    },
    description: {
      fontSize: 14,
      color: theme.text,
    },
    button: {
      marginTop: 16,
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
