import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useContacts, useThemedStyles} from '../../hooks';
import {Contact} from 'expo-contacts';
import {Feather} from '@expo/vector-icons';
import {AddressButton} from '../buttons';

type ContactItemSmallProps = {
  contact: Contact;
};

const ContactItemSmallComponent = ({contact}: ContactItemSmallProps) => {
  const themedStyles = useThemedStyles(styles);
  const {getAddressFromContact} = useContacts();

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
        <Text style={themedStyles.name}>{contact.name}</Text>
        <AddressButton address={getAddressFromContact({contact})!} />
      </View>
    </View>
  );
};

export const ContactItemSmall = React.memo(ContactItemSmallComponent);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      margin: 10,
    },
    name: {
      color: theme.text,
      fontSize: 16,
      textAlign: 'center',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginBottom: 8,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgrey',
      marginBottom: 8,
    },
    icon: {
      color: theme.background,
    },
  });
