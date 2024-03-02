import {ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useContacts, useThemedStyles} from '../../hooks';
import {Contact} from 'expo-contacts';
import {Theme} from '../../config';

type ContactDropdownProps = {
  onChange: (contact: Contact) => void;
};

export const ContactDropdown = ({onChange}: ContactDropdownProps) => {
  const {contacts} = useContacts();
  const themedStyles = useThemedStyles(styles);

  if (!contacts) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <Dropdown
      data={contacts}
      search={true}
      labelField="name"
      valueField="id"
      onChange={onChange}
      placeholder="Select contact"
      containerStyle={themedStyles.containerStyle}
      itemContainerStyle={themedStyles.itemContainer}
      style={themedStyles.selectCountry}
      selectedTextStyle={themedStyles.selectedTextStyle}
      placeholderStyle={themedStyles.selectedTextStyle}
      activeColor={themedStyles.activeColor.color}
      inputSearchStyle={themedStyles.inputSearchStyle}
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
      paddingHorizontal: 10,
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
  });
