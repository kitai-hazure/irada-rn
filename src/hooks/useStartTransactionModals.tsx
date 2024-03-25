import {useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  openSendTokensModal,
  selectCurrentAddress,
  selectCurrentChainId,
} from '../store';
import {CHAIN_LIST, CONSTANTS} from '../config';
import {useChain} from './useChain';
import {useSavedContacts} from './useSavedContacts';
import {SimilarityHelper, ToastHelper} from '../helpers';
import {useBalancesQuery} from './useBalancesQuery';
import {CurrencyDropdownType} from '../components';
import makeBlockie from 'ethereum-blockies-base64';

export const useStartTransactionModals = () => {
  const dispatch = useDispatch();
  const {changeChain} = useChain();
  const {data: savedContacts} = useSavedContacts();
  const currentAddress = useSelector(selectCurrentAddress);
  const currentChainId = useSelector(selectCurrentChainId);
  const {data: balances} = useBalancesQuery(currentAddress);

  const openModals = useCallback(async () => {
    if (savedContacts && balances) {
      const data = await AsyncStorage.getItem(CONSTANTS.STORAGE.DEEPLINK_SEND);
      if (data) {
        const {to, amount, chain, currency} = JSON.parse(data);
        if (isNaN(amount)) {
          ToastHelper.show({
            type: 'error',
            autoHide: true,
            text1: 'Error',
            text2: 'Invalid amount, should be a number',
          });
          return;
        }
        const toIndex = SimilarityHelper.mostSimilar(
          to,
          savedContacts.map(c => c.name),
          0.3,
        );
        if (toIndex === undefined) {
          ToastHelper.show({
            type: 'error',
            autoHide: true,
            text1: 'Error',
            text2: 'Invalid recipient, not found in contacts',
          });
          return;
        }
        const chainIndex = SimilarityHelper.mostSimilar(
          chain,
          CHAIN_LIST.map(c => c.name),
          0.3,
        );
        if (chainIndex === undefined) {
          ToastHelper.show({
            type: 'error',
            autoHide: true,
            text1: 'Error',
            text2: 'Invalid chain, not found in supported chains',
          });
          return;
        }
        if (currentChainId !== CHAIN_LIST[chainIndex].chainId) {
          changeChain(CHAIN_LIST[chainIndex].chainId);
          return;
        }
        const balanceIndex = SimilarityHelper.mostSimilar(
          currency,
          balances.map(b => `${b.symbol} ${b.name}`),
          0.3,
        );
        if (balanceIndex === undefined) {
          ToastHelper.show({
            type: 'error',
            autoHide: true,
            text1: 'Error',
            text2: 'Could not find the currency in your wallet',
          });
          return;
        }

        const resolvedAmount = amount;
        const resolvedContact = savedContacts[toIndex];
        const resolvedCurrency: CurrencyDropdownType = {
          ...balances[balanceIndex],
          name: balances[balanceIndex].name ?? '',
          image: {
            uri:
              balances[balanceIndex].logo ??
              makeBlockie(balances[balanceIndex].contractAddress),
          },
          address: balances[balanceIndex].contractAddress,
        };
        dispatch(
          openSendTokensModal({
            isOpen: true,
            transaction: {
              amount: resolvedAmount,
              currency: resolvedCurrency,
              to: resolvedContact,
            },
          }),
        );
        await AsyncStorage.removeItem(CONSTANTS.STORAGE.DEEPLINK_SEND);
      }
    }
  }, [savedContacts, changeChain, currentChainId, balances, dispatch]);

  useEffect(() => {
    openModals();
  }, [openModals]);

  return {openModals};
};
