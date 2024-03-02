import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useContacts, useThemedStyles} from '../../hooks';
import {Contact} from 'expo-contacts';
import {Theme} from '../../config';
import * as Haptics from 'expo-haptics';

interface AddContactModalProps {
  contact: Contact;
  hideModal?: () => void;
  openModal?: () => void;
}

export const AddContactModal = ({contact, hideModal}: AddContactModalProps) => {
  const {addToContact} = useContacts();
  const [address, setAddress] = useState<string>('');
  const themedStyles = useThemedStyles(styles);

  const handleAddToContact = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addToContact({
      contact,
      address,
    });
    hideModal?.();
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
      <TouchableOpacity
        onPress={handleAddToContact}
        style={themedStyles.addButton}>
        <Text style={themedStyles.addButtonText}>Add to {contact?.name}</Text>
      </TouchableOpacity>
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
    addButton: {
      margin: 10,
      padding: 10,
      backgroundColor: theme.container,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    addButtonText: {
      color: theme.text,
    },
  });
