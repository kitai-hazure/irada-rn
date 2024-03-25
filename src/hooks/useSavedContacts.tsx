import {useMemo} from 'react';
import {useContactsQuery} from './useContactsQuery';
import {useSelector} from 'react-redux';
import {selectContactMap} from '../store';

export const useSavedContacts = () => {
  const {data: contacts, ...rest} = useContactsQuery();
  const contactMap = useSelector(selectContactMap);

  const savedContacts = useMemo(() => {
    const saved = [];
    for (const contact of contacts ?? []) {
      if (contact.id && contactMap[contact.id]?.address) {
        saved.push(contact);
      }
    }
    return saved;
  }, [contacts, contactMap]);

  return {
    data: savedContacts,
    ...rest,
  };
};
