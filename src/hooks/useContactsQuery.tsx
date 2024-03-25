import {useQuery} from '@tanstack/react-query';
import {QUERY} from '../config';
import {Platform} from 'react-native';
import * as Contacts from 'expo-contacts';
import {request, PERMISSIONS} from 'react-native-permissions';
import {ToastHelper} from '../helpers';

export const useContactsQuery = () => {
  return useQuery({
    queryKey: [QUERY.CONTACTS],
    staleTime: Infinity,
    queryFn: async () => {
      const res = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.WRITE_CONTACTS
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
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: 'Permission denied, please allow access to contacts',
        });
      }
    },
  });
};
