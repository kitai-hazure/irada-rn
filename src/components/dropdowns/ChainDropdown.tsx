import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import {SelectCountry} from 'react-native-element-dropdown';
import {CHAINS, CHAIN_LIST, Chain} from '../../config/chain';
import {useSelector} from 'react-redux';
import {selectCurrentChain} from '../../store';

type ChainDropdownProps = {
  onChange: (chain: Chain) => void;
};

export const ChainDropdown = ({onChange}: ChainDropdownProps) => {
  const themedStyles = useThemedStyles(styles);
  const currentChain = useSelector(selectCurrentChain);
  const [value, setValue] = useState<Chain>(currentChain);

  return (
    <SelectCountry
      data={CHAIN_LIST.map(chain => ({
        chainId: chain.chainId,
        name: chain.name,
        image: {uri: chain.image},
      }))}
      labelField="name"
      valueField="name"
      imageField="image"
      value={{
        name: value.name,
        image: {uri: CHAINS[value.chainId].image},
        chainId: value.chainId,
      }}
      containerStyle={themedStyles.containerStyle}
      imageStyle={themedStyles.image}
      itemContainerStyle={themedStyles.itemContainer}
      style={themedStyles.selectCountry}
      selectedTextStyle={themedStyles.selectedTextStyle}
      placeholder="Select chain"
      placeholderStyle={themedStyles.selectedTextStyle}
      onChange={item => {
        setValue(CHAINS[item.chainId]);
        onChange(CHAINS[item.chainId]);
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
