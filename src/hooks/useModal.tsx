import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {useThemedStyles} from './useThemedStyles';
import {Theme} from '../config';

interface ModalType<T> {
  InnerComponent?: (props: T) => JSX.Element;
  InnerComponentProps?: T;
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const ModalComponent = ({
    InnerComponent,
    InnerComponentProps,
  }: ModalType<any>) => {
    const themedStyles = useThemedStyles(styles);

    return (
      <>
        <Modal
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          animationInTiming={500}
          animationOutTiming={500}
          backdropOpacity={0.8}
          backdropColor={themedStyles.bg.backgroundColor}
          isVisible={isOpen}
          statusBarTranslucent={true}
          onBackdropPress={handleClose}
          style={themedStyles.modal}
          useNativeDriver={true}>
          <View style={themedStyles.innerComponent}>
            {InnerComponent && <InnerComponent {...InnerComponentProps} />}
          </View>
        </Modal>
      </>
    );
  };

  return {
    isOpen,
    showModal: handleOpen,
    hideModal: handleClose,
    ModalComponent,
  };
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    bg: {
      backgroundColor: theme.container,
    },
    modal: {
      margin: 16,
    },
    innerComponent: {
      backgroundColor: theme.background,
      padding: 16,
      borderRadius: 16,
    },
  });
