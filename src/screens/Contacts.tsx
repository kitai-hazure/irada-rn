import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useContacts, useModal, useThemedStyles} from '../hooks';
import {AddContactModal, DrawerLayout} from '../components';
import {ContactItem} from '../components';
import {Theme} from '../config';
import Animated, {SlideInLeft, SlideInRight} from 'react-native-reanimated';

export const Contacts = () => {
  const {contacts} = useContacts();
  const [currentContact, setCurrentContact] = useState<number>();
  const {showModal, hideModal, ModalComponent} = useModal();
  const themedStyles = useThemedStyles(styles);

  return (
    <DrawerLayout>
      <View style={themedStyles.container}>
        <Animated.FlatList
          entering={SlideInRight.duration(500).delay(100)}
          exiting={SlideInLeft.duration(500).delay(100)}
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
