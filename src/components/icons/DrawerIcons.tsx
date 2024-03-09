import React from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';

type DrawerIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

export const ContactsIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      name={focused ? 'account-group' : 'account-group-outline'}
      size={size}
      color={color}
    />
  );
};

export const SavedContactsIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      name={focused ? 'bookmark' : 'bookmark-outline'}
      size={size}
      color={color}
    />
  );
};

export const SendMoneyIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      name={focused ? 'hand-coin' : 'hand-coin-outline'}
      size={size}
      color={color}
    />
  );
};

export const SettingsIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      name={focused ? 'cog' : 'cog-outline'}
      size={size}
      color={color}
    />
  );
};

export const HomeIcon = ({color, focused, size}: DrawerIconProps) => {
  return (
    <MaterialCommunityIcons
      name={focused ? 'home' : 'home-outline'}
      size={size}
      color={color}
    />
  );
};
