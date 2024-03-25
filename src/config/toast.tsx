import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToastProps, BaseToast} from 'react-native-toast-message';
import {COMMON_THEME} from './theme';

export const toastConfig = {
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1Black}
      text2Style={styles.text2Black}
    />
  ),

  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  infoToast: {
    borderLeftColor: COMMON_THEME.white,
    backgroundColor: COMMON_THEME.purple,
  },
  successToast: {
    borderLeftColor: COMMON_THEME.white,
    backgroundColor: COMMON_THEME.green,
  },
  errorToast: {
    borderLeftColor: COMMON_THEME.white,
    backgroundColor: COMMON_THEME.orange,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 15,
    fontWeight: '400',
    color: COMMON_THEME.white,
  },
  text1Black: {
    fontSize: 15,
    fontWeight: '400',
    color: COMMON_THEME.black,
  },
  text2: {
    fontSize: 13,
    fontWeight: '400',
    color: COMMON_THEME.white,
  },
  text2Black: {
    fontSize: 13,
    fontWeight: '400',
    color: COMMON_THEME.black,
  },
});
