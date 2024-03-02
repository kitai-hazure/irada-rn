import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import {SelectCountry} from 'react-native-element-dropdown';
import {SupportedChains} from '../../../types/chain';

const chainDropdownData: {
  label: SupportedChains;
  image: {uri: string};
}[] = [
  {
    image: {
      uri: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    label: 'Ethereum',
  },
  {
    label: 'Polygon',
    image: {
      uri: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    },
  },
];

type ChainDropdownProps = {
  onChange: (chain: SupportedChains) => void;
};

export const ChainDropdown = ({onChange}: ChainDropdownProps) => {
  const themedStyles = useThemedStyles(styles);
  const [value, setValue] = useState<SupportedChains>('Ethereum');

  return (
    <SelectCountry
      data={chainDropdownData}
      labelField="label"
      valueField="label"
      imageField="image"
      value={value}
      containerStyle={themedStyles.containerStyle}
      imageStyle={themedStyles.image}
      itemContainerStyle={themedStyles.itemContainer}
      style={themedStyles.selectCountry}
      selectedTextStyle={themedStyles.selectedTextStyle}
      placeholder="Select chain"
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
