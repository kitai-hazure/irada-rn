import {useDispatch, useSelector} from 'react-redux';
import {
  selectAccounts,
  selectCurrentChainId,
  selectCurrentPrivateKey,
  selectMnemonic,
  setCurrentChainId,
} from '../store';
import {AlchemyHelper, KeychainHelper, ToastHelper} from '../helpers';
import {useQueryInvalidator} from './useQueryInvalidator';
import {useCallback} from 'react';
import {useWallet} from './useWallet';

export const useChain = () => {
  const dispatch = useDispatch();
  const mnemonic = useSelector(selectMnemonic);
  const currentPrivateKey = useSelector(selectCurrentPrivateKey);
  const currentChainId = useSelector(selectCurrentChainId);
  const accounts = useSelector(selectAccounts);
  const {invalidateChainQueries} = useQueryInvalidator();
  const {changeChain: changeChainWC} = useWallet();

  const changeChain = useCallback(
    async (chainId: string) => {
      try {
        if (currentChainId === chainId) {
          return;
        }
        dispatch(setCurrentChainId(chainId));
        if (mnemonic && currentPrivateKey) {
          await KeychainHelper.set({
            accountCount: accounts.length,
            mnemonic: mnemonic,
            privateKey: currentPrivateKey,
            chainId: chainId,
          });
        }
        await changeChainWC(chainId);
        await AlchemyHelper.init(chainId);
        invalidateChainQueries();
      } catch (error: any) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: error.message ?? 'Failed to change chain',
        });
      }
    },
    [
      accounts.length,
      dispatch,
      invalidateChainQueries,
      mnemonic,
      currentPrivateKey,
      changeChainWC,
      currentChainId,
    ],
  );

  return {changeChain};
};
