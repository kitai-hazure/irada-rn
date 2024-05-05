import {Platform} from 'react-native';

export const CONSTANTS = {
  ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
  STORAGE: {
    SCHEDULED_TRANSACTION: 'SCHEDULED_TRANSACTION',
    DEEPLINK_SEND: 'DEEPLINK_SEND',
  },
  CONTACT_US_EMAIL: 'kitaihazure2210@gmail.com',
  ASSISTANT_NAME: Platform.OS === 'ios' ? 'Siri' : 'Google Assistant',
  ASSISTANT_PROMPT: Platform.OS === 'ios' ? 'Hey Siri' : 'Hey Google',
};
