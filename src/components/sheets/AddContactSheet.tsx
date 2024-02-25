import React, {useState} from 'react';
import {BottomSheetTextInput, TouchableOpacity} from '@gorhom/bottom-sheet';
import {Text, View} from 'react-native';
import {useContacts} from '../../hooks';
import {Contact} from 'expo-contacts';

interface AddContactSheetProps {
  contact: Contact;
}

export const AddContactSheet = ({contact}: AddContactSheetProps) => {
  const {addToContact} = useContacts();
  const [address, setAddress] = useState<string>('');

  return (
    <View>
      <BottomSheetTextInput
        value={address}
        onChangeText={txt => setAddress(txt)}
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
