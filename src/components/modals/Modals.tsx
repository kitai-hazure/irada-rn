import React, {useEffect} from 'react';
import {BottomSheet} from './BottomSheet';
import SessionProposal from './SessionProposal';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeProposalModal,
  closeSignModal,
  closeSignTypedDataModal,
  closeSignTransactionModal,
  selectMnemonic,
  selectMnemonicModal,
  selectProposalModal,
  selectSignModal,
  setMnemonicProposalModal,
  selectSignTypedDataModal,
  selectSignTransactionModal,
  closeSendTransactionModal,
  selectSendTransactionModal,
} from '../../store';
import {MnemonicInput} from '../inputs';
import {SessionSign} from './SessionSign';
import {StyleSheet, View} from 'react-native';

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
  const mnemonic = useSelector(selectMnemonic);

  const dispatch = useDispatch();

  const closeSPM = () => dispatch(closeProposalModal());
  const closeMnemonic = () => dispatch(setMnemonicProposalModal(false));
  const closeSRSign = () => dispatch(closeSignModal());
  const closeSRSignTypedData = () => dispatch(closeSignTypedDataModal());
  const closeSignTransaction = () => dispatch(closeSignTransactionModal());
  const closeSendTransaction = () => dispatch(closeSendTransactionModal());

  useEffect(() => {
    // dispatch(
    //   openSignTransactionModal({
    //     isOpen: true,
    //     requestEvent: undefined as any,
    //     requestSession: undefined as any,
    //   }),
    // );
  }, [dispatch]);

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
          <MnemonicInput values={mnemonic?.split(' ')} />
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
    </>
  );
};

const styles = StyleSheet.create({
  margins: {
    marginTop: 16,
    marginBottom: 32,
  },
});
