import {useCallback, useEffect} from 'react';
import {NotifeeHelper} from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  openSendTokensScheduledModal,
  selectAccounts,
  selectScheduledTransactions,
} from '../store';
import {useAccount} from './useAccount';
import {useChain} from './useChain';
import {CHAIN_LIST, CONSTANTS} from '../config';
import notifee, {EventType} from '@notifee/react-native';

export const useStartNotifeeModals = () => {
  const dispatch = useDispatch();
  const scheduledTransactions = useSelector(selectScheduledTransactions);
  const accounts = useSelector(selectAccounts);
  const {changeCurrentAccount} = useAccount();
  const {changeChain} = useChain();

  const openModals = useCallback(async () => {
    const data = await AsyncStorage.getItem(
      CONSTANTS.STORAGE.SCHEDULED_TRANSACTION,
    );
    if (data) {
      const transactionIds = JSON.parse(data);
      if (transactionIds && transactionIds?.length > 0) {
        const currentId = transactionIds[0];
        const scheduledTransaction = scheduledTransactions.find(
          tx => tx.id === currentId,
        );
        if (scheduledTransaction) {
          const account = accounts.find(
            acc => acc.address === scheduledTransaction.from,
          );
          const chain = CHAIN_LIST.find(
            c => c.chainId === scheduledTransaction.chain,
          );
          if (account && chain) {
            const index = accounts.indexOf(account);
            await changeCurrentAccount(account, index);
            await changeChain(chain.chainId);
            dispatch(
              openSendTokensScheduledModal({
                isOpen: true,
                scheduledTransaction,
              }),
            );
            await AsyncStorage.setItem(
              CONSTANTS.STORAGE.SCHEDULED_TRANSACTION,
              JSON.stringify(transactionIds.slice(1)),
            );
          }
        }
      }
    }
  }, [
    dispatch,
    scheduledTransactions,
    accounts,
    changeCurrentAccount,
    changeChain,
  ]);

  useEffect(() => {
    openModals();
    notifee.onForegroundEvent(async ({type, detail}) => {
      const {notification} = detail;
      if (type === EventType.PRESS && notification?.id) {
        await NotifeeHelper.addCurrentTransaction(notification.id);
        openModals();
      }
    });
  }, [openModals]);
};
