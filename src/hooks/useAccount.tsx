import {useDispatch, useSelector} from 'react-redux';
import {
  addAccount,
  selectAccounts,
  selectCurrentAddress,
  selectCurrentChainId,
  selectCurrentPrivateKey,
  selectMnemonic,
  setCurrentAccountIndex,
  setCurrentPrivateKey,
} from '../store';
import {useCallback, useMemo} from 'react';
import {Wallet, ethers} from 'ethers';
import {
  AlchemyHelper,
  KeychainHelper,
  MnemonicHelper,
  ToastHelper,
} from '../helpers';
import {useQueryInvalidator} from './useQueryInvalidator';
import {useWallet} from './useWallet';

export const useAccount = () => {
  const currentPrivateKey = useSelector(selectCurrentPrivateKey);
  const mnemonic = useSelector(selectMnemonic);
  const accounts = useSelector(selectAccounts);
  const currentAddress = useSelector(selectCurrentAddress);
  const currentChainId = useSelector(selectCurrentChainId);
  const dispatch = useDispatch();
  const {invalidateAccountQueries} = useQueryInvalidator();
  const {changeAccount} = useWallet();

  const provider = useMemo(() => {
    return AlchemyHelper.getProvider();
    // Reload the provider when the current chain changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChainId]);

  const signer = useMemo(() => {
    if (!currentPrivateKey || !provider) {
      return undefined;
    }
    return new ethers.Wallet(currentPrivateKey, provider);
  }, [currentPrivateKey, provider]);

  const createNewAccount = useCallback(async () => {
    try {
      if (mnemonic) {
        const {privateKey} = await MnemonicHelper.createWalletAtIndex(
          mnemonic,
          accounts.length,
        );
        const address = new Wallet(privateKey).address;
        await KeychainHelper.set({
          accountCount: accounts.length + 1,
          mnemonic: mnemonic,
          privateKey: privateKey,
          chainId: currentChainId,
        });
        dispatch(setCurrentAccountIndex(accounts.length));
        dispatch(setCurrentPrivateKey(privateKey));
        dispatch(addAccount({privateKey, address}));
        invalidateAccountQueries();
        return {
          privateKey,
          address,
        };
      }
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to create new account',
      });
    }
  }, [
    accounts.length,
    currentChainId,
    mnemonic,
    dispatch,
    invalidateAccountQueries,
  ]);

  const changeCurrentAccount = useCallback(
    async (account: {privateKey: string; address: string}, index: number) => {
      try {
        if (account.address === currentAddress) {
          return;
        }
        if (mnemonic) {
          dispatch(setCurrentPrivateKey(account.privateKey));
          dispatch(setCurrentAccountIndex(index));
          await KeychainHelper.set({
            accountCount: accounts.length,
            mnemonic: mnemonic,
            privateKey: account.privateKey,
            chainId: currentChainId,
          });
          changeAccount({address: account.address, chainId: currentChainId});
          invalidateAccountQueries();
        }
      } catch (error: any) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: error.message ?? 'Failed to change account',
        });
      }
    },
    [
      accounts.length,
      currentChainId,
      mnemonic,
      dispatch,
      invalidateAccountQueries,
      changeAccount,
      currentAddress,
    ],
  );

  return {provider, signer, createNewAccount, changeCurrentAccount};
};
