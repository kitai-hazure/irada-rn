import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useContacts, useThemedStyles} from '../../hooks';
import {Theme} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeAddAddressToContactModal,
  selectAddAddressToContactModal,
} from '../../store';
import {GestureButton, IradaButton} from '../buttons';
import {ToastHelper} from '../../helpers';

export const AddContactModal = () => {
  const {addToContact} = useContacts();
  const [address, setAddress] = useState<string>('');
  const themedStyles = useThemedStyles(styles);
  const {contact} = useSelector(selectAddAddressToContactModal);
  const dispatch = useDispatch();

  const handleAddToContact = () => {
    try {
      if (contact) {
        addToContact({contact, address});
        dispatch(closeAddAddressToContactModal());
      }
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to add address to contact',
      });
    }
  };

  return (
    <View style={themedStyles.container}>
      <TextInput
        value={address}
        onChangeText={txt => setAddress(txt)}
        placeholder="Add Address here"
        style={themedStyles.input}
        placeholderTextColor={themedStyles.input.color}
      />
      <GestureButton>
        <IradaButton onPress={handleAddToContact} color="container">
          {`Add to ${contact?.name}`}
        </IradaButton>
      </GestureButton>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    input: {
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.lightText,
      borderRadius: 8,
      color: theme.text,
    },
  });
