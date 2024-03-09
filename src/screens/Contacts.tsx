import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useContactsQuery, useModal, useThemedStyles} from '../hooks';
import {
  AddContactModal,
  DrawerLayout,
  Empty,
  Errored,
  Header,
  Loader,
} from '../components';
import {ContactItem} from '../components';
import {Theme} from '../config';

export const Contacts = () => {
  const {data: contacts, isLoading, isError} = useContactsQuery();
  const [currentContact, setCurrentContact] = useState<number>();
  const {showModal, hideModal, ModalComponent} = useModal();
  const themedStyles = useThemedStyles(styles);

  if (isError) {
    return <Errored />;
  } else if (isLoading) {
    return <Loader />;
  } else if (contacts?.length === 0) {
    return <Empty message="No contacts found" />;
  }

  return (
    <DrawerLayout>
      <Header title="Contacts" />
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
            hideModal,
            contact:
              contacts && currentContact !== undefined
                ? contacts[currentContact]
                : undefined,
          }}
        />
      </View>
    </DrawerLayout>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
