import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Contact} from 'expo-contacts';
import {useContacts, useThemedStyles} from '../../hooks';
import {Feather} from '@expo/vector-icons';
import {Theme} from '../../config';
import {AddressButton} from '../buttons';

type ContactItemProps = {
  contact: Contact;
  onPressAdd: () => void;
};

const ContactItemComponent = ({contact, onPressAdd}: ContactItemProps) => {
  const themedStyles = useThemedStyles(styles);
  const {getAddressFromContact} = useContacts();
  const address = getAddressFromContact({contact});

  return (
    <View style={themedStyles.container}>
      {contact.image ? (
        <Image style={themedStyles.image} source={{uri: contact.image?.uri}} />
      ) : (
        <View style={themedStyles.iconContainer}>
          <Feather name="user" size={30} style={themedStyles.icon} />
        </View>
      )}
      <View>
        <Text style={themedStyles.name} numberOfLines={1} ellipsizeMode="tail">
          {contact.name}
        </Text>
        {contact.phoneNumbers && contact.phoneNumbers.length > 0 && (
          <Text style={themedStyles.number}>
            {contact.phoneNumbers[0].number}
          </Text>
        )}
        {address && <AddressButton address={address} />}
      </View>
      <TouchableOpacity onPress={onPressAdd} style={themedStyles.rightAlign}>
        <Feather
          name={getAddressFromContact({contact}) ? 'edit' : 'plus'}
          size={24}
          style={themedStyles.addIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export const ContactItem = React.memo(ContactItemComponent);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.container,
      marginVertical: 8,
      padding: 16,
      borderRadius: 16,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 16,
      marginRight: 16,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 16,
      marginRight: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgrey',
    },
    icon: {
      color: theme.background,
    },
    addIcon: {
      color: theme.text,
    },
    number: {
      marginTop: 2,
      fontSize: 14,
      color: theme.lightText,
    },
    name: {
      fontSize: 16,
      color: theme.text,
    },
    rightAlign: {
      marginLeft: 'auto',
    },
  });
