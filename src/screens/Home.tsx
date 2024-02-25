import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useContacts} from '../hooks';
import {useBottomSheet} from '../hooks';
import {AddContactSheet} from '../components';

export const Home = () => {
  const {contacts, getAddressFromContact} = useContacts();
  const [currentContact, setCurrentContact] = useState<number>();
  const {showSheet, SheetComponent} = useBottomSheet({snapPoints: ['25%']});

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={({item: contact, index}) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              setCurrentContact(index);
              showSheet();
            }}>
            <Text>{getAddressFromContact({contact}) || contact.firstName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id!}
      />
      <SheetComponent
        InnerComponent={AddContactSheet}
        InnerComponentProps={{
          contact:
            contacts && currentContact ? contacts[currentContact] : undefined,
        }}
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
