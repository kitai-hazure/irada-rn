import {
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useSelector} from 'react-redux';
import {selectCurrentAddress, selectCurrentChain} from '../../store';
import {useTokenBalancesQuery} from '../../hooks/useTokenBalancesQuery';
import {Empty, Errored, Loader} from '../misc';
import {useThemedStyles} from '../../hooks';

export const TokenBalances = () => {
  const currentAddress = useSelector(selectCurrentAddress);
  const {data, isLoading, isError} = useTokenBalancesQuery(currentAddress);
  const themedStyles = useThemedStyles(styles);
  const currentChain = useSelector(selectCurrentChain);

  if (isError) {
    return <Errored />;
  } else if (isLoading) {
    return <Loader />;
  } else if (data?.length === 0) {
    return <Empty message="No tokens found" />;
  }

  const handleOpenContract = (contract: string) => {
    Linking.openURL(`${currentChain.blockExplorerUrl}address/${contract}`);
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.contractAddress}
        renderItem={({item}) => (
          <Pressable
            style={themedStyles.container}
            onPress={() => handleOpenContract(item.contractAddress)}>
            {item.logo ? (
              <Image source={{uri: item.logo}} style={themedStyles.logo} />
            ) : (
              <View style={themedStyles.emptyLogo}>
                <Text style={themedStyles.text}>{item.symbol?.charAt(0)}</Text>
              </View>
            )}
            <Text style={themedStyles.name}>{item.name}</Text>
            <Text style={themedStyles.balance}>
              {item.balance} {item.symbol}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    logo: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 16,
    },
    emptyLogo: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.container,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    text: {
      color: theme.text,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      flex: 1,
    },
    name: {
      color: theme.text,
      fontSize: 15,
      fontWeight: 'bold',
      marginRight: 16,
    },
    balance: {
      color: theme.text,
      fontSize: 13,
      marginLeft: 'auto',
    },
  });
