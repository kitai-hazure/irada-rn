import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, web3wallet} from '../../config';
import {
  getSignParamsMessage,
  getSignTypedDataParamsData,
  useThemedStyles,
  useWallet,
} from '../../hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeSendTransactionModal,
  closeSignModal,
  closeSignTransactionModal,
  closeSignTypedDataModal,
  selectSendTransactionModal,
  selectSignModal,
  selectSignTransactionModal,
  selectSignTypedDataModal,
} from '../../store';
import {
  ModalAddress,
  ModalBottomButtons,
  TransactionData,
} from '../walletconnect';
import {ScrollView} from 'react-native-gesture-handler';
import {ToastHelper} from '../../helpers';

type SessionSignProps = {
  type: 'SIGN' | 'SIGN_TYPED_DATA' | 'SIGN_TRANSACTION' | 'SEND_TRANSACTION';
};

export const SessionSign = ({type}: SessionSignProps) => {
  const themedStyles = useThemedStyles(styles);
  const selector = () => {
    switch (type) {
      case 'SIGN':
        return selectSignModal;
      case 'SIGN_TYPED_DATA':
        return selectSignTypedDataModal;
      case 'SIGN_TRANSACTION':
        return selectSignTransactionModal;
      case 'SEND_TRANSACTION':
        return selectSendTransactionModal;
      default:
        return selectSignModal;
    }
  };
  const {requestEvent, requestSession} = useSelector(selector());
  const {approveEIP155Request, rejectEIP155Request} = useWallet();
  const dispatch = useDispatch();

  const handleClose = () => {
    switch (type) {
      case 'SIGN':
        dispatch(closeSignModal());
        break;
      case 'SIGN_TYPED_DATA':
        dispatch(closeSignTypedDataModal());
        break;
      case 'SIGN_TRANSACTION':
        dispatch(closeSignTransactionModal());
        break;
      case 'SEND_TRANSACTION':
        dispatch(closeSendTransactionModal());
        break;
    }
  };

  if (!requestEvent || !requestSession) {
    return null;
  }

  const {topic, params} = requestEvent;
  const {request} = params;

  const isSignDataRequest = type === 'SIGN' || type === 'SIGN_TYPED_DATA';

  const message = isSignDataRequest
    ? type === 'SIGN_TYPED_DATA'
      ? getSignTypedDataParamsData(request.params)
      : getSignParamsMessage(request.params)
    : undefined;
  const transaction = isSignDataRequest ? undefined : request.params[0];

  const handleAcceptSignRequest = async () => {
    try {
      const response = await approveEIP155Request(requestEvent);
      if (!response) {
        return;
      }
      await web3wallet.respondSessionRequest({
        topic,
        response,
      });
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to sign transaction',
      });
    } finally {
      handleClose();
    }
  };

  const handleRejectSignRequest = async () => {
    try {
      const response = rejectEIP155Request(requestEvent);
      await web3wallet.respondSessionRequest({
        topic,
        response,
      });
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to reject transaction',
      });
    } finally {
      handleClose();
    }
  };

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>
        {type === 'SEND_TRANSACTION' ? 'Send' : 'Sign'} this{' '}
        {isSignDataRequest ? 'message?' : 'transaction?'}
      </Text>
      <ModalAddress />
      {isSignDataRequest && (
        <ScrollView style={themedStyles.textBox}>
          <Text style={themedStyles.textBoxText}>
            {type === 'SIGN_TYPED_DATA'
              ? JSON.stringify(message, null, 2)
              : message}
          </Text>
        </ScrollView>
      )}
      {!isSignDataRequest && <TransactionData transaction={transaction} />}
      <ModalBottomButtons
        handleApprove={handleAcceptSignRequest}
        handleReject={handleRejectSignRequest}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 32,
    },
    title: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginHorizontal: 20,
      marginBottom: 12,
    },
    textBox: {
      backgroundColor: theme.container,
      marginVertical: 8,
      borderRadius: 16,
      paddingBottom: 50,
      height: 150,
    },
    textBoxText: {
      color: theme.text,
      fontSize: 16,
      padding: 20,
    },
  });
