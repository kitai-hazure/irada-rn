import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import type {Verify} from '@walletconnect/types';
import {useThemedStyles} from '../../hooks';
import {AntDesign, Ionicons} from '@expo/vector-icons';

type WarningNoteProps = {
  verifyContext?: Verify.Context;
};

export const WarningNote = ({verifyContext}: WarningNoteProps) => {
  const themedStyles = useThemedStyles(styles);

  let textColor;
  let text;
  let description;
  let icon;

  if (!verifyContext) {
    return null;
  }

  if (verifyContext.verified.validation === 'VALID') {
    textColor = themedStyles.theme.green;
    text = 'Verified';
    description =
      'This dapp has been verified by Blowfish but maintain precaution';
    icon = (
      <AntDesign
        name="checkcircle"
        size={14}
        color={themedStyles.theme.green}
      />
    );
  } else if (verifyContext.verified.validation === 'INVALID') {
    textColor = themedStyles.theme.orange;
    text = 'Domain mismatch';
    description =
      'This dapp has a domain that does not match the sender, please be careful before proceeding';
    icon = (
      <Ionicons name="warning" size={16} color={themedStyles.theme.orange} />
    );
  } else if (verifyContext.verified.validation === 'UNKNOWN') {
    textColor = themedStyles.theme.yellow;
    text = 'Cannot verify';
    description =
      'This dapp cannot be verified, please be careful before proceeding';
    icon = (
      <AntDesign
        name="exclamationcircle"
        size={14}
        color={themedStyles.theme.yellow}
      />
    );
  }

  if (verifyContext.verified.isScam) {
    textColor = themedStyles.theme.orange;
    text = 'Scam Warning';
    description =
      'This dapp has been reported as unsafe due to certain security issues, please be careful before proceeding';
    icon = (
      <Ionicons name="warning" size={16} color={themedStyles.theme.orange} />
    );
  }

  return (
    <View style={[themedStyles.noteContainer]}>
      <View style={themedStyles.row}>
        {icon}
        <Text style={[themedStyles.text, {color: textColor}]}>{text}</Text>
      </View>
      <Text style={themedStyles.description}>{description}</Text>
    </View>
  );
};

export default WarningNote;

const styles = (theme: Theme) =>
  StyleSheet.create({
    noteContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.container,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.lightText,
      marginVertical: 12,
    },
    text: {
      fontSize: 14,
    },
    description: {
      fontSize: 12,
      textAlign: 'center',
      marginTop: 4,
      color: theme.text,
      opacity: 0.5,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
  });
