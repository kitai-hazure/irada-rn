import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import {ContactOrAddr} from '../contact';
import {AssetTransfersCategory, AssetTransfersResult} from 'alchemy-sdk';
import {useSelector} from 'react-redux';
import {selectCurrentChain} from '../../store';
import {Entypo} from '@expo/vector-icons';

export type TransactionItemProps = {
  item: AssetTransfersResult;
  received: boolean;
};

const TransactionItemComponent = ({item, received}: TransactionItemProps) => {
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
    <View style={themedStyles.item}>
      <View style={themedStyles.row}>
        <Text style={themedStyles.itemTitle}>{title}</Text>
        <Pressable onPress={() => handleOpenUrl(item.hash)}>
          <Entypo name="link" size={20} color={themedStyles.theme.text} />
        </Pressable>
      </View>
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
          <Text style={themedStyles.label}>Value:</Text>
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
    </View>
  );
};

export const TransactionItem = React.memo(TransactionItemComponent);

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
    },
    miniItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
      justifyContent: 'flex-start',
    },
    label: {
      color: theme.text,
      fontSize: 14,
      fontWeight: 'bold',
      width: '17%',
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
  });
