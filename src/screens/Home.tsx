import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useContacts} from '../hooks';
export const Home = () => {
  const {contacts, addToContact, getAddressFromContact} = useContacts();

  const address = '0x7Aec901dB0Ce6a2071747D121cb9c69E147D9387';

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={({item: contact}) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              addToContact({
                contact,
                address,
              })
            }>
            <Text>{getAddressFromContact({contact}) || contact.firstName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id!}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
