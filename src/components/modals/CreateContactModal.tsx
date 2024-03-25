import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {GestureButton, IradaButton} from '../buttons';
import {Theme} from '../../config';
import {useContacts, useThemedStyles} from '../../hooks';
import {useDispatch} from 'react-redux';
import {closeCreateContactModal} from '../../store';
import {ContactTypes} from 'expo-contacts';
import {ToastHelper} from '../../helpers';

export const CreateContactModal = () => {
  const themedStyles = useThemedStyles(styles);
  const [address, setAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const {createNewContact} = useContacts();
  const dispatch = useDispatch();

  const handleCreateContact = async () => {
    try {
      await createNewContact(
        {
          contactType: ContactTypes.Person,
          name,
        },
        address,
      );
      dispatch(closeCreateContactModal());
      ToastHelper.show({
        type: 'success',
        autoHide: true,
        text1: 'Success',
        text2: 'Contact created successfully',
      });
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to create contact',
      });
    }
  };

  return (
    <View style={themedStyles.container}>
      <TextInput
        value={name}
        returnKeyType="done"
        onChangeText={txt => setName(txt)}
        placeholder="Add name here"
        style={themedStyles.input}
        placeholderTextColor={themedStyles.input.color}
      />
      <TextInput
        value={address}
        onChangeText={txt => setAddress(txt)}
        placeholder="Add address here"
        style={themedStyles.input}
        placeholderTextColor={themedStyles.input.color}
      />
      <GestureButton>
        <IradaButton
          onPress={handleCreateContact}
          color="container"
          style={themedStyles.button}>
          Create Contact
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
      margin: 8,
      marginVertical: 6,
      padding: 10,
      borderWidth: 1,
      borderColor: theme.lightText,
      borderRadius: 8,
      color: theme.text,
    },
    button: {
      marginTop: 8,
    },
  });
