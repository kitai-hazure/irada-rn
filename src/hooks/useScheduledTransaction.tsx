import {useDispatch, useSelector} from 'react-redux';
import {
  addScheduledTransaction,
  removeScheduledTransaction,
  selectContactMap,
  selectCurrentAddress,
  selectCurrentChainId,
  selectScheduledTransactions,
} from '../store';
import {Contact} from 'expo-contacts';
import {CurrencyDropdownType} from '../components';
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {useMemo} from 'react';
import {TimeUnit, TriggerType} from '@notifee/react-native';
import {NotifeeHelper, ToastHelper} from '../helpers';
import {CHAINS} from '../config';

export type CreateNewScheduledTransactionOptions = {
  amount: string;
  currency: CurrencyDropdownType;
  to: Contact;
  repeatsEvery: number;
  timeUnit: TimeUnit;
  description: string;
};

export const useScheduledTransaction = () => {
  const dispatch = useDispatch();
  const contactMap = useSelector(selectContactMap);
  const currentAddress = useSelector(selectCurrentAddress);
  const currentChainId = useSelector(selectCurrentChainId);
  const allScheduledTransactions = useSelector(selectScheduledTransactions);

  const createNewScheduledTransaction = async ({
    amount,
    currency,
    to,
    repeatsEvery,
    timeUnit,
    description,
  }: CreateNewScheduledTransactionOptions) => {
    if (to.id && contactMap[to.id]?.address && currentAddress) {
      try {
        const id = uuidv4();
        dispatch(
          addScheduledTransaction({
            id,
            amount,
            currency,
            to: contactMap[to.id].address,
            from: currentAddress,
            chain: currentChainId,
            start: new Date(Date.now()).toDateString(),
            repeatsEvery,
            timeUnit,
            description,
          }),
        );
        await NotifeeHelper.createTriggerNotification({
          trigger: {
            type: TriggerType.INTERVAL,
            interval: repeatsEvery,
            timeUnit,
          },
          notification: {
            id: id,
            ios: {
              sound: 'default',
            },
            android: {
              channelId: NotifeeHelper.CHANNEL.id,
            },
            data: {id},
            title: description,
            body: `Send ${amount} ${currency.symbol} to ${to.name} on ${CHAINS[currentChainId].name}`,
          },
        });
      } catch (error: any) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: error.message ?? 'Failed to create scheduled transaction',
        });
      }
    }
  };

  const deleteScheduledTransaction = async (id: string) => {
    try {
      dispatch(removeScheduledTransaction(id));
      await NotifeeHelper.cancelTriggerNotification(id);
    } catch (error: any) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: error.message ?? 'Failed to delete scheduled transaction',
      });
    }
  };

  const scheduledTransactions = useMemo(() => {
    return allScheduledTransactions.filter(
      transaction =>
        transaction.from === currentAddress &&
        transaction.chain === currentChainId,
    );
  }, [allScheduledTransactions, currentAddress, currentChainId]);

  return {
    createNewScheduledTransaction,
    deleteScheduledTransaction,
    scheduledTransactions,
  };
};
