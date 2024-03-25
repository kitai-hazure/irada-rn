import React from 'react';
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import {StyleSheet} from 'react-native';

type DrawerIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

export const ContactsIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name={focused ? 'account-group' : 'account-group-outline'}
      size={size}
      color={color}
    />
  );
};

export const SavedContactsIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name={focused ? 'bookmark' : 'bookmark-outline'}
      size={size}
      color={color}
    />
  );
};

export const SendMoneyIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name={focused ? 'hand-coin' : 'hand-coin-outline'}
      size={size}
      color={color}
    />
  );
};

export const SettingsIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name={focused ? 'cog' : 'cog-outline'}
      size={size}
      color={color}
    />
  );
};

export const HomeIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name={focused ? 'home' : 'home-outline'}
      size={size}
      color={color}
    />
  );
};

export const ScheduleTransactionsIcon = ({
  color,
  focused,
  size,
}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name={focused ? 'calendar' : 'calendar-outline'}
      size={size}
      color={color}
    />
  );
};

export const TokenBalancesIcon = ({color, size}: DrawerIconProps) => {
  return (
    <FontAwesome5
      style={styles.icon}
      name={'coins'}
      size={size}
      color={color}
    />
  );
};

export const TransactionHistoryIcon = ({color, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      style={styles.icon}
      name={'history'}
      size={size}
      color={color}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: -20,
  },
});
