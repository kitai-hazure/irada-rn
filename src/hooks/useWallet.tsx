import {
  EIP155_SIGNING_METHODS,
  wcAccounts,
  wcChains,
  wcEvents,
  wcMethods,
  web3wallet,
} from '../config';
import {getSdkError} from '@walletconnect/utils';
import {useSelector} from 'react-redux';
import {
  selectCurrentAddress,
  selectCurrentChain,
  selectCurrentPrivateKey,
} from '../store';
import type {SignClientTypes, SessionTypes} from '@walletconnect/types';
import {Wallet, utils} from 'ethers';
import {
  formatJsonRpcError,
  formatJsonRpcResult,
} from '@walletconnect/jsonrpc-utils';
import {useMemo} from 'react';
import {AlchemyHelper} from '../helpers';

export function convertHexToUtf8(value: string) {
  if (utils.isHexString(value)) {
    return utils.toUtf8String(value);
  }
  return value;
}

export function getSignParamsMessage(params: string[]) {
  const message = params.filter(p => !utils.isAddress(p))[0];
  return convertHexToUtf8(message);
}

export function getSignTypedDataParamsData(params: string[]) {
  const data = params.filter(p => !utils.isAddress(p))[0];
  if (typeof data === 'string') {
    return JSON.parse(data);
  }
  return data;
}

type ChangeAccountOptions = {
  address: string;
  chainId: string;
};

export const useWallet = () => {
  const currentAddress = useSelector(selectCurrentAddress);
  const currentPrivateKey = useSelector(selectCurrentPrivateKey);
  const currentChain = useSelector(selectCurrentChain);

  const provider = useMemo(() => {
    return AlchemyHelper.getProvider();
    // Reload the provider when the current chain changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChain]);

  const pair = async (uri: string) => {
    await web3wallet.pair({uri});
  };

  const disconnect = async (topic: string) => {
    await web3wallet.disconnectSession({
      topic,
      reason: getSdkError('USER_DISCONNECTED'),
    });
  };

  const changeAccount = async ({address, chainId}: ChangeAccountOptions) => {
    const sessions = web3wallet.getActiveSessions();
    Object.values(sessions).forEach(async session => {
      await web3wallet.emitSessionEvent({
        topic: session.topic,
        event: {
          name: 'accountsChanged',
          data: [address],
        },
        chainId: `eip155:${chainId}`,
      });
    });
  };

  const changeChain = async (chainId: string) => {
    const sessions = web3wallet.getActiveSessions();
    Object.values(sessions).forEach(async session => {
      await web3wallet.emitSessionEvent({
        topic: session.topic,
        event: {
          name: 'chainChanged',
          data: 1,
        },
        chainId: `eip155:${chainId}`,
      });
    });
  };

  const accept = async (
    id: number,
    namespaces: Record<string, SessionTypes.BaseNamespace>,
  ) => {
    if (currentAddress) {
      await web3wallet.approveSession({id, namespaces});
    }
  };

  const reject = async (id: number) => {
    await web3wallet.rejectSession({
      id,
      reason: getSdkError('USER_REJECTED_METHODS'),
    });
  };

  const getSupportedNamespaces = () => {
    const supportedNamespaces = {
      eip155: {
        chains: wcChains,
        events: wcEvents,
        methods: wcMethods,
        accounts: wcAccounts([currentAddress!]),
      },
    };
    return supportedNamespaces;
  };

  const approveEIP155Request = async (
    requestEvent: SignClientTypes.EventArguments['session_request'],
  ) => {
    if (!currentPrivateKey) {
      return;
    }
    const {params, id} = requestEvent;
    const {chainId, request} = params;
    if (chainId !== currentChain.chainId) {
      throw new Error(getSdkError('UNSUPPORTED_CHAINS').message);
    }
    const wallet = new Wallet(currentPrivateKey);

    switch (request.method) {
      case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
      case EIP155_SIGNING_METHODS.ETH_SIGN:
        const message = getSignParamsMessage(request.params);
        const signedMessage = await wallet.signMessage(message);
        return formatJsonRpcResult(id, signedMessage);

      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
        const {
          domain,
          types,
          message: data,
        } = getSignTypedDataParamsData(request.params);
        // https://github.com/ethers-io/ethers.js/issues/687#issuecomment-714069471
        delete types.EIP712Domain;
        const signedData = await wallet._signTypedData(domain, types, data);
        return formatJsonRpcResult(id, signedData);

      case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        const sendTransaction = request.params[0];
        const connectedWallet = wallet.connect(provider);
        const {hash} = await connectedWallet.sendTransaction(sendTransaction);
        return formatJsonRpcResult(id, hash);

      case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
        const signTransaction = request.params[0];
        const signature = await wallet.signTransaction(signTransaction);
        return formatJsonRpcResult(id, signature);

      default:
        throw new Error(getSdkError('INVALID_METHOD').message);
    }
  };

  const rejectEIP155Request = (
    request: SignClientTypes.EventArguments['session_request'],
  ) => {
    const {id} = request;
    return formatJsonRpcError(id, getSdkError('USER_REJECTED_METHODS').message);
  };

  return {
    pair,
    disconnect,
    accept,
    reject,
    approveEIP155Request,
    rejectEIP155Request,
    changeAccount,
    changeChain,
    getSupportedNamespaces,
  };
};
