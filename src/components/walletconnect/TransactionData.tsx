import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import {BigNumber, ethers} from 'ethers';
import {ContactOrAddr} from '../contact';

type TransactionDataProps = {
  transaction?: {
    data: string;
    from: string;
    gasLimit: string;
    gasPrice?: string;
    nonce?: string;
    to: string;
    value?: string;
  };
};

export const TransactionData = ({transaction}: TransactionDataProps) => {
  const themedStyles = useThemedStyles(styles);

  if (!transaction) {
    return (
      <ActivityIndicator
        size={'large'}
        color={themedStyles.theme.purple}
        style={themedStyles.indicator}
      />
    );
  }

  return (
    <View>
      <View style={themedStyles.container}>
        <Text style={themedStyles.label}>From:</Text>
        <ContactOrAddr address={transaction.from} />
      </View>
      <View style={themedStyles.container}>
        <Text style={themedStyles.label}>To:</Text>
        <ContactOrAddr address={transaction.to} />
      </View>
      {transaction.value && (
        <View style={themedStyles.container}>
          <Text style={themedStyles.label}>Value:</Text>
          <Text style={themedStyles.value}>
            {ethers.utils.formatEther(transaction.value)} ETH
          </Text>
        </View>
      )}
      {transaction.gasPrice && (
        <View style={themedStyles.container}>
          <Text style={themedStyles.label}>Gas Price:</Text>
          <Text style={themedStyles.value}>
            {ethers.utils.formatUnits(transaction.gasPrice, 'gwei')} gwei
          </Text>
        </View>
      )}
      {transaction.gasLimit && (
        <View style={themedStyles.container}>
          <Text style={themedStyles.label}>Gas Limit:</Text>
          <Text style={themedStyles.value}>
            {BigNumber.from(transaction.gasLimit).toNumber()} gas
          </Text>
        </View>
      )}
      {transaction.data && (
        <ScrollView style={themedStyles.textBox}>
          <Text style={themedStyles.textBoxText}>Data: {transaction.data}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    label: {
      color: theme.text,
      width: '17%',
      fontSize: 14,
      fontWeight: 'bold',
    },
    value: {
      color: theme.text,
      flex: 1,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
      alignItems: 'center',
    },
    textBox: {
      backgroundColor: theme.container,
      marginVertical: 8,
      borderRadius: 16,
      paddingBottom: 50,
      height: 120,
    },
    textBoxText: {
      color: theme.text,
      fontSize: 16,
      padding: 20,
    },
    indicator: {
      marginVertical: 32,
    },
  });
