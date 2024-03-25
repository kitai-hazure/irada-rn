import * as Contacts from 'expo-contacts';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectContactMap,
  addAddressToContact,
  deleteAddressFromContact,
} from '../store';
import {ethers} from 'ethers';
import {useCallback} from 'react';

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

  const addToContact = useCallback(
    ({contact, address}: AddAddressToContactOptions) => {
      if (!contact.id) {
        throw new Error('Invalid contact id');
      } else {
        if (!ethers.utils.isAddress(address)) {
          throw new Error('Invalid address');
        }
        dispatch(
          addAddressToContact({
            address,
            contactId: contact.id,
          }),
        );
      }
    },
    [dispatch],
  );

  const removeFromContact = useCallback(
    ({contact}: RemoveAddressFromContactOptions) => {
      if (!contact.id) {
        throw new Error('Invalid contact id');
      } else {
        dispatch(
          deleteAddressFromContact({
            contactId: contact.id,
          }),
        );
      }
    },
    [dispatch],
  );

  const getAddressFromContact = useCallback(
    ({contact}: GetAddressFromContactOptions) => {
      if (!contact.id) {
        throw new Error('Invalid contact id');
      } else {
        return contactMap[contact.id]?.address ?? undefined;
      }
    },
    [contactMap],
  );

  const getParticularContact = useCallback(async (id: string) => {
    return await Contacts.getContactByIdAsync(id);
  }, []);

  const createNewContact = useCallback(
    async (contact: Contacts.Contact, address: string) => {
      if (!ethers.utils.isAddress(address)) {
        throw new Error('Invalid address');
      }
      await Contacts.addContactAsync(contact);
      addToContact({contact, address});
    },
    [addToContact],
  );

  return {
    addToContact,
    removeFromContact,
    getAddressFromContact,
    getParticularContact,
    createNewContact,
  };
};
