import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useThemedStyles, useTransactionsToQuery} from '../../hooks';
import {TransactionItem} from './TransactionItem';
import {Theme} from '../../config';
import {Empty, Errored, Loader} from '../misc';
import {useSelector} from 'react-redux';
import {selectCurrentAddress} from '../../store';

export const TransactionsToList = () => {
  const currentAddress = useSelector(selectCurrentAddress);
  const {
    data: transactionsTo,
    isLoading: isLoadingTransactionsTo,
    isError: isErrorTransactionsTo,
  } = useTransactionsToQuery(currentAddress);
  const themedStyles = useThemedStyles(styles);

  if (isLoadingTransactionsTo) {
    return <Loader />;
  } else if (isErrorTransactionsTo) {
    return <Errored />;
  } else if (transactionsTo?.transfers.length === 0) {
    return <Empty message="No transactions found" />;
  }

  return (
    <View style={themedStyles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactionsTo?.transfers}
        renderItem={({item}) => <TransactionItem item={item} received={true} />}
        keyExtractor={item => item.hash}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
