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
  padded?: boolean;
};

const ContactOrAddrComponent = ({
  address,
  padded = true,
}: ContactOrAddrProps) => {
  const addressMap = useSelector(selectAddressMap);
  const [contact, setContact] = useState<Contact.Contact>();
  const themedStyles = useThemedStyles(styles);
  const {getParticularContact} = useContacts();

  useEffect(() => {
    (async () => {
      const contactId = addressMap[address.toLowerCase()]?.contactId;
      if (contactId) {
        const res = await getParticularContact(contactId);
        if (res) {
          setContact(res);
        }
      }
    })();
  }, [address, addressMap, getParticularContact]);

  return (
    <View style={[themedStyles.container, padded && themedStyles.padded]}>
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
            {contact.name?.length > 8
              ? `${contact.name.slice(0, 8)}...`
              : contact.name}
          </Text>
          <AddressButton address={address} padded={false} />
        </View>
      ) : (
        <AddressButton address={address} padded={false} />
      )}
    </View>
  );
};

export const ContactOrAddr = React.memo(ContactOrAddrComponent);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.container,
      borderRadius: 16,
    },
    padded: {
      padding: 8,
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
