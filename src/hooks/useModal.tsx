import React, {useState} from 'react';
import {InteractionManager} from 'react-native';
import Modal from 'react-native-modal';

interface ModalType<T> {
  InnerComponent?: (props: T) => JSX.Element;
  InnerComponentProps?: T;
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    InteractionManager.runAfterInteractions(() => {
      setIsOpen(true);
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const ModalComponent = ({
    InnerComponent,
    InnerComponentProps,
  }: ModalType<any>) => {
    return (
      <>
        <Modal
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          animationInTiming={500}
          animationOutTiming={1000}
          isVisible={isOpen}
          statusBarTranslucent={true}
          onBackdropPress={handleClose}>
          {InnerComponent && <InnerComponent {...InnerComponentProps} />}
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
