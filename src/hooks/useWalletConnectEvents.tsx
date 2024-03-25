import {useCallback, useEffect} from 'react';
import {Web3WalletTypes} from '@walletconnect/web3wallet';
import {EIP155_SIGNING_METHODS, web3wallet} from '../config';
import {useDispatch} from 'react-redux';
import {
  openProposalModal,
  openSignTransactionModal,
  openSignModal,
  openSignTypedDataModal,
  openSendTransactionModal,
} from '../store';
import {ToastHelper} from '../helpers';

export const useWalletConnectEvents = (initialized: boolean) => {
  const dispatch = useDispatch();

  const onSessionProposal = useCallback(
    ({id, params, verifyContext}: Web3WalletTypes.SessionProposal) => {
      dispatch(openProposalModal({isOpen: true, id, params, verifyContext}));
    },
    [dispatch],
  );

  const onAuthRequest = useCallback((request: Web3WalletTypes.AuthRequest) => {
    console.log('AuthRequestModal', request);
  }, []);

  const onSessionRequest = useCallback(
    async (requestEvent: Web3WalletTypes.SessionRequest) => {
      const {topic, params} = requestEvent;
      const {request} = params;
      const requestSession = web3wallet.engine.signClient.session.get(topic);

      switch (request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
          dispatch(openSignModal({isOpen: true, requestEvent, requestSession}));
          break;

        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
          dispatch(
            openSignTypedDataModal({
              isOpen: true,
              requestEvent,
              requestSession,
            }),
          );
          break;

        case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
          dispatch(
            openSignTransactionModal({
              isOpen: true,
              requestEvent,
              requestSession,
            }),
          );
          break;

        case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
          dispatch(
            openSendTransactionModal({
              isOpen: true,
              requestEvent,
              requestSession,
            }),
          );
          break;

        default:
          ToastHelper.show({
            type: 'error',
            autoHide: true,
            text1: 'Error',
            text2: 'Unsupported method',
          });
          break;
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (initialized && web3wallet) {
      web3wallet.on('session_proposal', onSessionProposal);
      web3wallet.on('session_request', onSessionRequest);
      web3wallet.on('auth_request', onAuthRequest);
    }

    return () => {
      web3wallet?.events.removeAllListeners();
    };
  }, [initialized, onAuthRequest, onSessionProposal, onSessionRequest]);
};
