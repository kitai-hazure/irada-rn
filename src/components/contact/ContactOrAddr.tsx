import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Theme} from '../../config';
import {useSelector} from 'react-redux';
import {selectAddressMap} from '../../store';
import {useContacts, useThemedStyles} from '../../hooks';
import {Feather} from '@expo/vector-icons';
import {AddressButton} from '../buttons';
import * as Contact from 'expo-contacts';

type ContactOrAddrProps = {
  address: string;
};

export const ContactOrAddr = ({address}: ContactOrAddrProps) => {
  const addressMap = useSelector(selectAddressMap);
  const [contact, setContact] = useState<Contact.Contact>();
  const themedStyles = useThemedStyles(styles);
  const {getParticularContact} = useContacts();

  useEffect(() => {
    (async () => {
      const contactId = addressMap[address]?.contactId;
      if (contactId) {
        const res = await getParticularContact(contactId);
        if (res) {
          setContact(res);
        }
      }
    })();
  }, [address, addressMap, getParticularContact]);

  return (
    <View style={themedStyles.container}>
      {contact ? (
        <View style={themedStyles.contactContainer}>
          {contact.image ? (
            <Image
              style={themedStyles.image}
              source={{uri: contact.image?.uri}}
            />
          ) : (
            <View style={themedStyles.iconContainer}>
              <Feather name="user" size={30} style={themedStyles.icon} />
            </View>
          )}
          <Text style={themedStyles.contactName}>
            {contact.name?.length > 15
              ? `${contact.name.slice(0, 15)}...`
              : contact.name}
          </Text>
          <AddressButton address={address} />
        </View>
      ) : (
        <AddressButton address={address} />
      )}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.container,
      padding: 16,
      borderRadius: 16,
      flex: 1,
    },
    image: {
      width: 30,
      height: 30,
      borderRadius: 8,
      marginRight: 8,
    },
    iconContainer: {
      width: 30,
      height: 30,
      borderRadius: 8,
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightgrey',
    },
    icon: {
      color: theme.background,
    },
    contactContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contactName: {
      color: theme.text,
      fontSize: 14,
      marginRight: 12,
    },
  });
