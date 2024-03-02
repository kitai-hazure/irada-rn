import {useCallback, useEffect} from 'react';
import {Web3WalletTypes} from '@walletconnect/web3wallet';
import {EIP155_SIGNING_METHODS, web3wallet} from '../config';

export default function useWalletConnectEvents(initialized: boolean) {
  const onSessionProposal = useCallback(
    ({id, params, verifyContext}: Web3WalletTypes.SessionProposal) => {
      console.log('onSessionProposal', id, params, verifyContext);
      // set the verify context so it can be displayed in the projectInfoCard
      // SettingsStore.setCurrentRequestVerifyContext(proposal.verifyContext);
      // ModalStore.open('SessionProposalModal', {proposal});
    },
    [],
  );

  const onAuthRequest = useCallback((request: Web3WalletTypes.AuthRequest) => {
    // ModalStore.open('AuthRequestModal', {request});
    console.log('AuthRequestModal', request);
  }, []);

  const onSessionRequest = useCallback(
    async (requestEvent: Web3WalletTypes.SessionRequest) => {
      const {topic, params, verifyContext} = requestEvent;
      const {request} = params;
      const requestSession = web3wallet.engine.signClient.session.get(topic);
      // set the verify context so it can be displayed in the projectInfoCard
      // SettingsStore.setCurrentRequestVerifyContext(verifyContext);

      console.log('onSessionRequest', requestSession, verifyContext);

      switch (request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
          // return ModalStore.open('SessionSignModal', {
          //   requestEvent,
          //   requestSession,
          // });
          break;

        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
          // return ModalStore.open('SessionSignTypedDataModal', {
          //   requestEvent,
          //   requestSession,
          // });
          break;

        case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
          // return ModalStore.open('SessionSendTransactionModal', {
          //   requestEvent,
          //   requestSession,
          // });
          break;

        default:
          // return ModalStore.open('SessionUnsuportedMethodModal', {
          //   requestEvent,
          //   requestSession,
          // });
          break;
      }
    },
    [],
  );

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (initialized && web3wallet) {
      // sign
      web3wallet.on('session_proposal', onSessionProposal);
      web3wallet.on('session_request', onSessionRequest);
      // auth
      web3wallet.on('auth_request', onAuthRequest);
      // web3wallet.on('session_delete', data => {
      //   console.log('session_delete event received', data);
      //   SettingsStore.setSessions(
      //     Object.values(web3wallet.getActiveSessions()),
      //   );
      // });
      // load sessions on init
      // SettingsStore.setSessions(Object.values(web3wallet.getActiveSessions()));
    }
  }, [initialized, onAuthRequest, onSessionProposal, onSessionRequest]);
}
