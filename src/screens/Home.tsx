import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useContacts, useModal, useThemedStyles} from '../hooks';
import {AddContactModal} from '../components';
import {ContactItem} from '../components';
import {Theme} from '../config';

export const Home = () => {
  const {contacts} = useContacts();
  const [currentContact, setCurrentContact] = useState<number>();
  const {showModal, ModalComponent} = useModal();
  const themedStyles = useThemedStyles(styles);

  return (
    <View style={themedStyles.container}>
      <FlatList
        data={contacts}
        renderItem={({item: contact, index}) => (
          <ContactItem
            contact={contact}
            onPressAdd={() => {
              setCurrentContact(index);
              showModal();
            }}
          />
        )}
        keyExtractor={item => item.id!}
      />
      <ModalComponent
        InnerComponent={AddContactModal}
        InnerComponentProps={{
          contact:
            contacts && currentContact ? contacts[currentContact] : undefined,
        }}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
