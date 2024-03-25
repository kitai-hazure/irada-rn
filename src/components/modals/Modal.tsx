import React from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useThemedStyles} from '../../hooks';
import {Pressable, StyleSheet} from 'react-native';
import {Theme} from '../../config';
import {BlurView} from '@react-native-community/blur';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export const Modal = ({isOpen, closeModal, children}: ModalProps) => {
  const themedStyles = useThemedStyles(styles);

  const close = () => {
    closeModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut.springify()}
        style={themedStyles.backdrop}>
        <BlurView
          style={themedStyles.backdrop}
          blurType={themedStyles.theme.blurType}
          blurAmount={8}
        />
        <Pressable style={themedStyles.backdrop} onPress={close} />
        <Animated.View
          style={themedStyles.modal}
          entering={FadeIn}
          exiting={FadeOut}>
          {children}
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: theme.background,
      padding: 16,
      position: 'absolute',
      zIndex: 11,
      borderRadius: 16,
      width: '90%',
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  });
