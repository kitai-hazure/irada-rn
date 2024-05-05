import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {Platform} from 'react-native';
import * as Contacts from 'expo-contacts';
import {PERMISSIONS, check} from 'react-native-permissions';
import {ToastHelper} from '../helpers';

export const useContactsQuery = () => {
  return useQuery({
    queryKey: [QUERY.CONTACTS],
    staleTime: Infinity,
    queryFn: async () => {
      try {
        const res = await check(
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.READ_CONTACTS
            : PERMISSIONS.IOS.CONTACTS,
        );
        if (res === 'granted') {
          const {data} = await Contacts.getContactsAsync({sort: 'firstName'});
          return data;
        } else {
          if (res === 'denied' || res === 'blocked') {
            ToastHelper.show({
              type: 'error',
              autoHide: true,
              text1: 'Error',
              text2: 'Permission denied, please allow access to contacts',
            });
          }
          return [];
        }
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });
};
