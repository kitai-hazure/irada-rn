import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import Clipboard from '@react-native-clipboard/clipboard';
import {Feather} from '@expo/vector-icons';
import {FormatHelper, ToastHelper} from '../../helpers';
import {GestureButton} from './GestureButton';

type AddressButtonProps = {
  address: string;
  padded?: boolean;
};

const AddressButtonComponent = ({
  address,
  padded = true,
}: AddressButtonProps) => {
  const themedStyles = useThemedStyles(styles);

  const onPress = async () => {
    Clipboard.setString(address);
    ToastHelper.show({
      type: 'success',
      autoHide: true,
      text1: 'Copied',
      text2: 'Address copied to clipboard',
    });
  };

  return (
    <GestureButton>
      <TouchableOpacity
        onPress={onPress}
        style={[themedStyles.container, padded && themedStyles.padded]}>
        <Feather name="copy" size={14} color={themedStyles.copyIcon.color} />
        <Text style={themedStyles.address}>
          {FormatHelper.formatAddress(address)}
        </Text>
      </TouchableOpacity>
    </GestureButton>
  );
};

export const AddressButton = React.memo(AddressButtonComponent);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },
    padded: {
      padding: 8,
    },
    address: {
      color: theme.text,
    },
    copyIcon: {
      color: theme.green,
      marginRight: 8,
    },
  });
