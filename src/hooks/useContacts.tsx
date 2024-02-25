import * as Contacts from 'expo-contacts';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectContactMap,
  addAddressToContact,
  deleteAddressFromContact,
} from '../store';
import {useContactsQuery} from './useContactsQuery';

type AddAddressToContactOptions = {
  contact: Contacts.Contact;
  address: string;
};

type GetAddressFromContactOptions = {
  contact: Contacts.Contact;
};

type RemoveAddressFromContactOptions = {
  contact: Contacts.Contact;
};

export const useContacts = () => {
  const contactMap = useSelector(selectContactMap);
  const dispatch = useDispatch();
  const {data, error, isLoading} = useContactsQuery();

  const addToContact = ({contact, address}: AddAddressToContactOptions) => {
    if (!contact.id) {
      console.warn('Invalid contact id');
      return;
    } else {
      dispatch(
        addAddressToContact({
          address,
          contactId: contact.id,
        }),
      );
    }
  };

  const removeFromContact = ({contact}: RemoveAddressFromContactOptions) => {
    if (!contact.id) {
      console.warn('Invalid contact id');
      return;
    } else {
      dispatch(
        deleteAddressFromContact({
          contactId: contact.id,
        }),
      );
    }
  };

  const getAddressFromContact = ({contact}: GetAddressFromContactOptions) => {
    if (!contact.id) {
      console.warn('Invalid contact id');
      return;
    } else {
      return contactMap[contact.id]?.address ?? undefined;
    }
  };

  return {
    contacts: data,
    isLoadingContacts: isLoading,
    errorLoadingContacts: error,
    addToContact,
    removeFromContact,
    getAddressFromContact,
  };
};
