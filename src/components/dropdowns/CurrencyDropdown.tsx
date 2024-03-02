import {StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Theme, supportedCurrencies} from '../../config';
import {useThemedStyles} from '../../hooks';
import {SelectCountry} from 'react-native-element-dropdown';
import {
  SupportedChains,
  SupportedCurrencies,
  SupportedCurrenciesEthereum,
  SupportedCurrenciesPolygon,
} from '../../../types/chain';

type DropdownData = {
  label: SupportedCurrenciesEthereum | SupportedCurrenciesPolygon;
  image: {uri: string};
}[];

const currencyDropdownData = (chain: SupportedChains): DropdownData => {
  const common: DropdownData = [
    {
      label: 'USDC',
      image: {
        uri: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
      },
    },
    {
      label: 'DAI',
      image: {
        uri: 'https://cryptologos.cc/logos/dai-dai-logo.png',
      },
    },
    {
      label: 'USDT',
      image: {
        uri: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      },
    },
    {
      label: 'UNI',
      image: {
        uri: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
      },
    },
  ];
  if (chain === 'Ethereum') {
    return [
      {
        label: 'ETH',
        image: {
          uri: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        },
      },
      ...common,
    ];
  } else {
    return [
      {
        label: 'MATIC',
        image: {
          uri: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
        },
      },
      ...common,
    ];
  }
};

type CurrencyDropdownProps = {
  onChange: (currency: SupportedCurrencies) => void;
  chain: SupportedChains;
};

export const CurrencyDropdown = ({onChange, chain}: CurrencyDropdownProps) => {
  const themedStyles = useThemedStyles(styles);
  const [value, setValue] = useState<SupportedCurrencies>('USDC');

  const data = useMemo(() => {
    return currencyDropdownData(chain);
  }, [chain]);

  useEffect(() => {
    if (!supportedCurrencies(chain).includes(value)) {
      setValue('USDC');
      onChange('USDC');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  return (
    <SelectCountry
      data={data}
      labelField="label"
      valueField="label"
      imageField="image"
      value={value}
      containerStyle={themedStyles.containerStyle}
      imageStyle={themedStyles.image}
      itemContainerStyle={themedStyles.itemContainer}
      style={themedStyles.selectCountry}
      selectedTextStyle={themedStyles.selectedTextStyle}
      placeholder="Select currency"
      placeholderStyle={themedStyles.selectedTextStyle}
      onChange={item => {
        setValue(item.label);
        onChange(item.label);
      }}
      activeColor={themedStyles.activeColor.color}
    />
  );
};

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
      marginRight: 10,
    },
    selectCountry: {
      width: '100%',
      height: 40,
      borderRadius: 5,
      paddingLeft: 10,
      paddingRight: 10,
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
  });
