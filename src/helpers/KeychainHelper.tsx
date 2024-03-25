import * as Keychain from 'react-native-keychain';

export type KeychainPasswordOptions = {
  mnemonic: string;
  privateKey: string;
  accountCount: number;
  chainId: string;
};

export const KeychainHelper = {
  set: async (options: KeychainPasswordOptions) => {
    return await Keychain.setGenericPassword(
      KeychainHelper.KEYS.MNEMONIC,
      JSON.stringify(options),
      KeychainHelper.options,
    );
  },

  get: async () => {
    return await Keychain.getGenericPassword(KeychainHelper.options);
  },

  reset: async () => {
    return await Keychain.resetGenericPassword(KeychainHelper.options);
  },

  biometricType: async () => {
    return await Keychain.getSupportedBiometryType(KeychainHelper.options);
  },

  options: {
    securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    rules: Keychain.SECURITY_RULES.AUTOMATIC_UPGRADE,
    authenticationPrompt: {
      title: 'Authentication required',
      subtitle: 'Authentication is required to confirm your identity.',
      description: 'Trying to access your wallet?',
      cancel: 'Cancel',
    },
    authenticationType:
      Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  },

  KEYS: {
    MNEMONIC: 'mnemonic-phrase',
  },
};
