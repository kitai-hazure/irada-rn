import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import {ContactOrAddr} from '../contact';
import {AssetTransfersCategory, AssetTransfersResult} from 'alchemy-sdk';
import {useSelector} from 'react-redux';
import {selectCurrentChain} from '../../store';

export type TransactionItemProps = {
  item: AssetTransfersResult;
  received: boolean;
};

export const TransactionItem = ({item, received}: TransactionItemProps) => {
  const themedStyles = useThemedStyles(styles);
  const currentChain = useSelector(selectCurrentChain);

  const handleOpenUrl = (tx: string) => {
    Linking.openURL(`${currentChain?.blockExplorerUrl}tx/${tx}`);
  };

  const title = useMemo(() => {
    switch (item.category) {
      case AssetTransfersCategory.ERC20:
        return 'ERC20 Transfer';
      case AssetTransfersCategory.ERC1155:
        return 'ERC1155 Transfer';
      default:
        return 'Transfer';
    }
  }, [item.category]);

  return (
    <Pressable
      onPress={() => handleOpenUrl(item.hash)}
      style={themedStyles.item}>
      <Text style={themedStyles.itemTitle}>{title}</Text>
      {item.from && (
        <View style={themedStyles.miniItem}>
          <Text style={themedStyles.label}>From:</Text>
          <ContactOrAddr address={item.from} />
        </View>
      )}
      {item.to && (
        <View style={themedStyles.miniItem}>
          <Text style={themedStyles.label}>To:</Text>
          <ContactOrAddr address={item.to} />
        </View>
      )}
      {item.value && (
        <View style={themedStyles.miniItem}>
          <Text style={themedStyles.label}>Amount:</Text>
          <Text style={themedStyles.value}>
            <Text
              style={received ? themedStyles.positive : themedStyles.negative}>
              {item.value} {item.asset}
            </Text>{' '}
            {item.category !==
            (AssetTransfersCategory.EXTERNAL ||
              AssetTransfersCategory.EXTERNAL ||
              AssetTransfersCategory.SPECIALNFT)
              ? `(${item.category.toUpperCase()})`
              : ''}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 8,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.lightText,
      backgroundColor: theme.background,
    },
    itemTitle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    miniItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
      justifyContent: 'flex-start',
    },
    label: {
      color: theme.text,
      flex: 0.3,
      fontSize: 14,
      fontWeight: 'bold',
    },
    value: {
      color: theme.text,
      flex: 1,
      fontSize: 14,
      alignSelf: 'flex-start',
    },
    positive: {
      color: theme.green,
    },
    negative: {
      color: theme.orange,
    },
  });
