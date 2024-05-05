import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useContactsQuery, useThemedStyles} from '../hooks';
import {
  DrawerLayout,
  Empty,
  Errored,
  GestureButton,
  Header,
  IradaButton,
  Loader,
} from '../components';
import {ContactItem} from '../components';
import {Theme} from '../config';
import {useDispatch} from 'react-redux';
import {openAddAddressToContactModal, openCreateContactModal} from '../store';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const ContactsScreen = () => {
  const {data: contacts, isLoading, isError} = useContactsQuery();
  const themedStyles = useThemedStyles(styles);
  const dispatch = useDispatch();

  if (isError) {
    return (
      <DrawerLayout>
        <Header title="Contacts" />
        <Errored />
      </DrawerLayout>
    );
  } else if (isLoading) {
    return (
      <DrawerLayout>
        <Header title="Contacts" />
        <Loader />
      </DrawerLayout>
    );
  }

  const handleOpenCreateContactModal = () => {
    dispatch(openCreateContactModal({isOpen: true}));
  };

  return (
    <DrawerLayout>
      <Header title="Contacts" />
      <GestureButton style={themedStyles.plusButton}>
        <IradaButton
          color="purple"
          style={themedStyles.plusIcon}
          onPress={handleOpenCreateContactModal}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </IradaButton>
      </GestureButton>
      {contacts?.length === 0 ? (
        <Empty message="No contacts found" />
      ) : (
        <View style={themedStyles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={contacts}
            renderItem={({item: contact}) => {
              return (
                <ContactItem
                  contact={contact}
                  onPressAdd={() => {
                    dispatch(
                      openAddAddressToContactModal({isOpen: true, contact}),
                    );
                  }}
                />
              );
            }}
            keyExtractor={item => item.id!}
          />
        </View>
      )}
    </DrawerLayout>
  );
};

export const Contacts = React.memo(ContactsScreen);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    plusIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      padding: 0,
    },
    plusButton: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      zIndex: 2,
    },
  });
