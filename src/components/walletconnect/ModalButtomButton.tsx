import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureButton, IradaButton} from '../buttons';
import {useThemedStyles} from '../../hooks';
import {Theme} from '../../config';

type ModalBottomButtonsProps = {
  handleApprove: () => void;
  handleReject: () => void;
};

export const ModalBottomButtons = ({
  handleApprove,
  handleReject,
}: ModalBottomButtonsProps) => {
  const themedStyles = useThemedStyles(styles);

  return (
    <View style={themedStyles.buttonContainer}>
      <GestureButton style={themedStyles.button}>
        <IradaButton color="lightText" onPress={handleReject}>
          Reject
        </IradaButton>
      </GestureButton>
      <GestureButton style={themedStyles.button}>
        <IradaButton color="purple" onPress={handleApprove}>
          Approve
        </IradaButton>
      </GestureButton>
    </View>
  );
};

const styles = (_: Theme) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      gap: 16,
      marginVertical: 16,
    },
    button: {
      flex: 1,
    },
  });
