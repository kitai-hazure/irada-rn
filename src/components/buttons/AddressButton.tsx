import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import Clipboard from '@react-native-clipboard/clipboard';
import * as Haptics from 'expo-haptics';
import {Feather} from '@expo/vector-icons';
import {AddressHelper} from '../../helpers';
import {GestureButton} from './GestureButton';

type AddressButtonProps = {
  address: string;
};

export const AddressButton = ({address}: AddressButtonProps) => {
  const themedStyles = useThemedStyles(styles);

  const onPress = async () => {
    Clipboard.setString(address);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <GestureButton>
      <TouchableOpacity onPress={onPress} style={themedStyles.container}>
        <Feather name="copy" size={14} color={themedStyles.copyIcon.color} />
        <Text style={themedStyles.address}>
          {AddressHelper.formatAddress(address)}
        </Text>
      </TouchableOpacity>
    </GestureButton>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },
    address: {
      color: theme.text,
    },
    copyIcon: {
      color: theme.green,
      marginRight: 8,
    },
  });
