import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useContacts} from '../../hooks';
import {Contact} from 'expo-contacts';

interface AddContactModalProps {
  contact: Contact;
}

export const AddContactModal = ({contact}: AddContactModalProps) => {
  const {addToContact} = useContacts();
  const [address, setAddress] = useState<string>('');

  return (
    <View style={styles.container}>
      <TextInput
        value={address}
        onChangeText={txt => setAddress(txt)}
        placeholder="Add Address here"
      />
      <TouchableOpacity
        onPress={() =>
          addToContact({
            contact,
            address,
          })
        }>
        <Text>Add to {contact?.firstName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
