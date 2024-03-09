import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {Platform} from 'react-native';
import * as Contacts from 'expo-contacts';
import {request, PERMISSIONS} from 'react-native-permissions';

export const useContactsQuery = () => {
  return useQuery({
    queryKey: [QUERY.CONTACTS],
    queryFn: async () => {
      const res = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_CONTACTS
          : PERMISSIONS.IOS.CONTACTS,
        {
          message: 'Irada would like to view your contacts',
          title: 'Contacts',
          buttonPositive: 'Allow',
        },
      );
      if (res === 'granted') {
        const {data} = await Contacts.getContactsAsync({sort: 'firstName'});
        return data;
      } else {
        throw new Error('Permission denied');
      }
    },
  });
};
