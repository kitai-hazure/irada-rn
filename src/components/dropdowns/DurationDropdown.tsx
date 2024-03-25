import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useThemedStyles} from '../../hooks';
import {Theme} from '../../config';
import {TimeUnit} from '@notifee/react-native';

type DurationDropdownProps = {
  onChange: (duration: TimeUnit) => void;
};

const durationData: {id: number; unit: TimeUnit; name: string}[] = [
  {
    id: 0,
    name: 'minutes',
    unit: TimeUnit.MINUTES,
  },
  {
    id: 1,
    name: 'hours',
    unit: TimeUnit.HOURS,
  },
  {
    id: 2,
    name: 'days',
    unit: TimeUnit.DAYS,
  },
];

export const DurationDropdown = ({onChange}: DurationDropdownProps) => {
  const themedStyles = useThemedStyles(styles);

  return (
    <Dropdown
      data={durationData}
      labelField="name"
      valueField="id"
      onChange={({unit}) => onChange(unit)}
      placeholder={'Select a duration'}
      containerStyle={themedStyles.containerStyle}
      itemContainerStyle={themedStyles.itemContainer}
      style={themedStyles.selectCountry}
      selectedTextStyle={themedStyles.selectedTextStyle}
      placeholderStyle={themedStyles.selectedTextStyle}
      activeColor={themedStyles.activeColor.color}
      itemTextStyle={themedStyles.itemTextStyle}
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
    selectCountry: {
      height: 40,
      borderRadius: 5,
      color: theme.text,
    },
    containerStyle: {
      borderRadius: 16,
      padding: 8,
      backgroundColor: theme.container,
      flexShrink: 1,
      elevation: 2,
      display: 'flex',
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: theme.text,
      overflow: 'hidden',
    },
    itemContainer: {
      backgroundColor: theme.container,
      borderRadius: 16,
      margin: -8,
    },
    inputSearchStyle: {
      color: theme.text,
      borderColor: theme.text,
      borderRadius: 8,
    },
    itemTextStyle: {
      color: theme.text,
      fontSize: 14,
    },
    loader: {
      paddingVertical: 10,
    },
  });
