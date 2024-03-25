import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useThemedStyles, useTransactionsFromQuery} from '../../hooks';
import {Theme} from '../../config';
import {TransactionItem} from './TransactionItem';
import {Empty, Errored, Loader} from '../misc';
import {useSelector} from 'react-redux';
import {selectCurrentAddress} from '../../store';

export const TransactionsFromList = () => {
  const currentAddress = useSelector(selectCurrentAddress);
  const {
    data: transactionsFrom,
    isLoading: isLoadingTransactionsFrom,
    isError: isErrorTransactionsFrom,
  } = useTransactionsFromQuery(currentAddress);
  const themedStyles = useThemedStyles(styles);

  if (isLoadingTransactionsFrom) {
    return <Loader />;
  } else if (isErrorTransactionsFrom) {
    return <Errored />;
  } else if (transactionsFrom?.transfers.length === 0) {
    return <Empty message="No transactions found" />;
  }

  return (
    <View style={themedStyles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactionsFrom?.transfers}
        renderItem={({item}) => (
          <TransactionItem item={item} received={false} />
        )}
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
