/* eslint-disable react-hooks/exhaustive-deps */
import * as Contacts from 'expo-contacts';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectContactMap,
  addAddressToContact,
  deleteAddressFromContact,
} from '../store';
import {useContactsQuery} from './useContactsQuery';
import {ethers} from 'ethers';
import {useEffect, useState} from 'react';

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
  const [savedContacts, setSavedContacts] = useState<Contacts.Contact[]>([]);
  const contactMap = useSelector(selectContactMap);
  const dispatch = useDispatch();
  const {data, error, isLoading} = useContactsQuery();

  const addToContact = ({contact, address}: AddAddressToContactOptions) => {
    if (!contact.id) {
      console.warn('Invalid contact id');
      return;
    } else {
      if (!ethers.utils.isAddress(address)) {
        console.warn('Invalid address');
        return;
      }
      dispatch(
        addAddressToContact({
          address,
          contactId: contact.id,
        }),
      );
      setSavedContacts(prev => [...prev, contact]);
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
      setSavedContacts(prev => prev.filter(c => c.id !== contact.id));
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

  useEffect(() => {
    const saved = [];
    for (const contact of data || []) {
      if (contact.id && contactMap[contact.id]?.address) {
        saved.push(contact);
      }
    }
    setSavedContacts(saved);
  }, [data]);

  return {
    contacts: data,
    isLoadingContacts: isLoading,
    errorLoadingContacts: error,
    addToContact,
    removeFromContact,
    getAddressFromContact,
    savedContacts,
  };
};
