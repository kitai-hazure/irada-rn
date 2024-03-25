import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeProposalModal,
  closeSignModal,
  closeSignTypedDataModal,
  closeSignTransactionModal,
  selectMnemonic,
  closeMnemonicModal,
  closeSendTransactionModal,
  closeCreateScheduledTransactionModal,
  selectProposalModal,
  selectSignTypedDataModal,
  selectMnemonicModal,
  selectSignModal,
  selectSendTransactionModal,
  selectSignTransactionModal,
  selectCreateScheduledTransactionModal,
  selectSendTokensModal,
  selectSendTokensScheduledModal,
  closeSendTokensModal,
  closeSendTokensScheduledModal,
  closeAddAddressToContactModal,
  closeCreateContactModal,
  selectAddAddressToContactModal,
  selectCreateContactModal,
} from '../../store';
import {MnemonicInput} from '../inputs';
import {BottomSheet} from './BottomSheet';
import {SessionSign} from './SessionSign';
import SessionProposal from './SessionProposal';
import {SendTokens} from '../transactions';
import {Modal} from './Modal';
import {AddContactModal} from './AddContactModal';
import {CreateContactModal} from './CreateContactModal';

export const Modals = () => {
  const {isOpen: isOpenProposalModal} = useSelector(selectProposalModal);
  const {isOpen: isOpenSignTypedDataModal} = useSelector(
    selectSignTypedDataModal,
  );
  const {isOpen: isOpenSignTransModal} = useSelector(
    selectSignTransactionModal,
  );
  const {isOpen: isOpenSendTransModal} = useSelector(
    selectSendTransactionModal,
  );
  const {isOpen: isOpenMnemonicModal} = useSelector(selectMnemonicModal);
  const {isOpen: isOpenSignModal} = useSelector(selectSignModal);
  const {isOpen: isOpenCreateScheduledTransactionModal} = useSelector(
    selectCreateScheduledTransactionModal,
  );
  const {isOpen: isOpenSendTokensModal} = useSelector(selectSendTokensModal);
  const {isOpen: isOpenSendTokensScheduledModal} = useSelector(
    selectSendTokensScheduledModal,
  );
  const {isOpen: isOpenAddAddrToCon} = useSelector(
    selectAddAddressToContactModal,
  );
  const {isOpen: isOpenCreateContact} = useSelector(selectCreateContactModal);

  const mnemonic = useSelector(selectMnemonic);

  const dispatch = useDispatch();

  const closeSPM = () => dispatch(closeProposalModal());
  const closeMnemonic = () => dispatch(closeMnemonicModal());
  const closeSRSign = () => dispatch(closeSignModal());
  const closeSRSignTypedData = () => dispatch(closeSignTypedDataModal());
  const closeSignTransaction = () => dispatch(closeSignTransactionModal());
  const closeSendTransaction = () => dispatch(closeSendTransactionModal());
  const closeCST = () => dispatch(closeCreateScheduledTransactionModal());
  const closeSendTokens = () => dispatch(closeSendTokensModal());
  const closeSendTokensScheduled = () =>
    dispatch(closeSendTokensScheduledModal());
  const closeAddAddrToCon = () => dispatch(closeAddAddressToContactModal());
  const closeCreateContact = () => dispatch(closeCreateContactModal());

  if (!mnemonic) {
    return null;
  }

  return (
    <>
      {/* Session Proposal Modal */}
      <BottomSheet
        height={600}
        isOpen={isOpenProposalModal}
        closeSheet={closeSPM}>
        <SessionProposal />
      </BottomSheet>
      {/* Mnemonic Reveal Modal */}
      <BottomSheet
        height={400}
        isOpen={isOpenMnemonicModal}
        closeSheet={closeMnemonic}>
        <View style={styles.margins}>
          <MnemonicInput values={mnemonic.split(' ')} />
        </View>
      </BottomSheet>
      {/* Session Request Sign Modal */}
      <BottomSheet
        height={420}
        isOpen={isOpenSignModal}
        closeSheet={closeSRSign}>
        <SessionSign type="SIGN" />
      </BottomSheet>
      {/* Session Request Sign Typed Data Modal */}
      <BottomSheet
        height={420}
        isOpen={isOpenSignTypedDataModal}
        closeSheet={closeSRSignTypedData}>
        <SessionSign type="SIGN_TYPED_DATA" />
      </BottomSheet>
      {/* Session Request Sign Transaction */}
      <BottomSheet
        height={800}
        isOpen={isOpenSignTransModal}
        closeSheet={closeSignTransaction}>
        <SessionSign type="SIGN_TRANSACTION" />
      </BottomSheet>
      {/* Session Request Send Transaction */}
      <BottomSheet
        height={800}
        isOpen={isOpenSendTransModal}
        closeSheet={closeSendTransaction}>
        <SessionSign type="SEND_TRANSACTION" />
      </BottomSheet>
      {/* Create Scheduled Transaction */}
      <BottomSheet
        height={1000}
        isOpen={isOpenCreateScheduledTransactionModal}
        closeSheet={closeCST}>
        <SendTokens type="CREATE_TRANSACTION" />
      </BottomSheet>
      {/* Send Tokens */}
      <BottomSheet
        height={800}
        minHeight={400}
        isOpen={isOpenSendTokensModal}
        closeSheet={closeSendTokens}>
        <SendTokens type="SEND_WITH_PARAMS" />
      </BottomSheet>
      {/* Send Tokens Scheduled */}
      <BottomSheet
        height={800}
        isOpen={isOpenSendTokensScheduledModal}
        closeSheet={closeSendTokensScheduled}>
        <SendTokens type="SCHEDULED_TRANSACTION" />
      </BottomSheet>
      {/* Add Address To Contact */}
      <Modal isOpen={isOpenAddAddrToCon} closeModal={closeAddAddrToCon}>
        <AddContactModal />
      </Modal>
      {/* Create New Contact */}
      <Modal isOpen={isOpenCreateContact} closeModal={closeCreateContact}>
        <CreateContactModal />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  margins: {
    marginTop: 16,
    marginBottom: 32,
  },
});
