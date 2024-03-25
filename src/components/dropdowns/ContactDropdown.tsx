import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useThemedStyles} from '../../hooks';
import {Contact} from 'expo-contacts';
import {Theme} from '../../config';
import {useSavedContacts} from '../../hooks/useSavedContacts';

type ContactDropdownProps = {
  onChange: (contact: Contact) => void;
  value: Contact | undefined;
  disabled?: boolean;
};

export const ContactDropdown = ({
  onChange,
  value,
  disabled,
}: ContactDropdownProps) => {
  const {isLoading, data: savedContacts} = useSavedContacts();
  const themedStyles = useThemedStyles(styles);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="small"
        color={themedStyles.theme.purple}
        style={themedStyles.loader}
      />
    );
  }

  return (
    <Dropdown
      data={savedContacts}
      search={true}
      labelField="name"
      valueField="id"
      value={value}
      onChange={onChange}
      placeholder={
        savedContacts.length === 0 ? 'No contacts found' : 'Select a contact'
      }
      disable={savedContacts.length === 0 || disabled}
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
