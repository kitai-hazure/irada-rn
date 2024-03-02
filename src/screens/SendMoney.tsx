import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerNavigationProps,
  DrawerNavigatorRoutes,
} from '../../types/navigation';
import {Theme} from '../config';
import {useThemedStyles} from '../hooks';
import {
  ChainDropdown,
  ContactDropdown,
  CurrencyDropdown,
  DrawerLayout,
} from '../components';
import {SupportedChains, SupportedCurrencies} from '../../types/chain';
import {Contact} from 'expo-contacts';

export const SendMoney = ({
  route,
}: DrawerNavigationProps<DrawerNavigatorRoutes, 'SendMoney'>) => {
  console.log('ROUTE PARAMS', route.params);
  const themedStyles = useThemedStyles(styles);
  const [amount, setAmount] = useState(route.params?.amount.toString() ?? '');
  const [to, setTo] = useState<Contact>(route.params?.to);
  const [currency, setCurrency] = useState<SupportedCurrencies>(
    route.params?.currency ?? 'USDC',
  );
  const [chain, setChain] = useState<SupportedChains>(
    route.params?.chain ?? 'Ethereum',
  );

  return (
    <DrawerLayout>
      <ScrollView style={themedStyles.scrollContainer}>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount to send"
          placeholderTextColor={themedStyles.placeholder.color}
          style={themedStyles.input}
        />
        <View style={themedStyles.dropdownContainer}>
          <ChainDropdown onChange={val => setChain(val)} />
        </View>
        <View style={themedStyles.dropdownContainer}>
          <ContactDropdown onChange={val => setTo(val)} />
        </View>
        <View style={themedStyles.dropdownContainer}>
          <CurrencyDropdown onChange={val => setCurrency(val)} chain={chain} />
        </View>
        <TouchableOpacity
          style={themedStyles.submitButton}
          onPress={() => {
            console.log('SENDING MONEY', {
              amount,
              to,
              currency,
              chain,
            });
          }}>
          <Text style={themedStyles.submitButtonText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </DrawerLayout>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    scrollContainer: {
      flex: 1,
      flexGrow: 1,
    },
    input: {
      backgroundColor: theme.container,
      color: theme.text,
      fontSize: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginVertical: 8,
      height: 48,
    },
    submitButton: {
      backgroundColor: theme.purple,
      padding: 14,
      marginTop: 8,
      borderRadius: 8,
      alignItems: 'center',
      width: '50%',
      alignSelf: 'center',
    },
    submitButtonText: {
      color: theme.white,
    },
    placeholder: {
      color: theme.lightText,
    },
    dropdownContainer: {
      marginVertical: 8,
      backgroundColor: theme.container,
      borderRadius: 8,
      padding: 8,
    },
  });
