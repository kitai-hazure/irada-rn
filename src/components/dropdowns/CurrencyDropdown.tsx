import {ActivityIndicator, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {Theme} from '../../config';
import {useBalancesQuery, useThemedStyles} from '../../hooks';
import {SelectCountry} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import {selectCurrentAddress} from '../../store';
import makeBlockie from 'ethereum-blockies-base64';

type CurrencyDropdownProps = {
  onChange: (currency: CurrencyDropdownType) => void;
  value: CurrencyDropdownType | undefined;
  disabled?: boolean;
};

export type CurrencyDropdownType = {
  name: string;
  image: {uri: string};
  address: string;
  decimals?: number;
  balance?: string;
  symbol?: string;
};

const CurrencyDropdownComponent = ({
  onChange,
  value,
  disabled,
}: CurrencyDropdownProps) => {
  const themedStyles = useThemedStyles(styles);
  const currentAddress = useSelector(selectCurrentAddress);
  const {data: balances, isLoading} = useBalancesQuery(currentAddress);

  const tokenData: CurrencyDropdownType[] = useMemo(() => {
    if (!balances) {
      return [];
    }
    const data = balances.map(token => {
      return {
        name: token.name ?? '',
        image: {
          uri: token.logo ?? makeBlockie(token.contractAddress),
        },
        address: token.contractAddress,
        balance: token.balance,
        decimals: token.decimals,
        symbol: token.symbol,
      };
    });
    return data;
  }, [balances]);

  if (isLoading || !balances) {
    return (
      <ActivityIndicator
        size="small"
        color={themedStyles.theme.purple}
        style={themedStyles.loader}
      />
    );
  }

  return (
    <SelectCountry
      data={tokenData}
      labelField="name"
      valueField="name"
      imageField="image"
      value={value}
      containerStyle={themedStyles.containerStyle}
      imageStyle={themedStyles.image}
      itemContainerStyle={themedStyles.itemContainer}
      style={themedStyles.selectCountry}
      selectedTextStyle={themedStyles.selectedTextStyle}
      disable={tokenData.length === 0 || disabled}
      placeholder={
        tokenData.length === 0 ? 'No tokens found' : 'Select a token'
      }
      placeholderStyle={themedStyles.selectedTextStyle}
      onChange={item => {
        onChange(item);
      }}
      activeColor={themedStyles.activeColor.color}
    />
  );
};

export const CurrencyDropdown = React.memo(CurrencyDropdownComponent);

const styles = (theme: Theme) =>
  StyleSheet.create({
    activeColor: {
      color: theme.container,
    },
    selectedTextStyle: {
      color: theme.text,
    },
    image: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: 10,
    },
    selectCountry: {
      width: '100%',
      height: 40,
      borderRadius: 5,
      color: theme.text,
    },
    containerStyle: {
      borderRadius: 16,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: theme.container,
      flexShrink: 1,
      elevation: 2,
      display: 'flex',
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: theme.text,
    },
    itemContainer: {
      backgroundColor: theme.container,
      borderRadius: 16,
      paddingVertical: 2,
    },
    loader: {
      paddingVertical: 10,
    },
  });
