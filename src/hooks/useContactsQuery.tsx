import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {PermissionsAndroid} from 'react-native';
import * as Contacts from 'expo-contacts';

export const useContactsQuery = () => {
  return useQuery({
    queryKey: [QUERY.CONTACTS],
    queryFn: async () => {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'Irada would like to view your contacts.',
          buttonPositive: 'Allow',
        },
      );
      if (status === 'granted') {
        const {data} = await Contacts.getContactsAsync();
        return data;
      } else {
        throw new Error('Permission denied');
      }
    },
  });
};
