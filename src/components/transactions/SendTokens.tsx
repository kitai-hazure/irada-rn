import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {CONSTANTS, QUERY, Theme} from '../../config';
import {
  useGasPriceQuery,
  useNativeBalanceQuery,
  useSavedContacts,
  useScheduledTransaction,
  useThemedStyles,
  useTransfer,
} from '../../hooks';
import {GestureButton, IradaButton} from '../buttons';
import {ethers} from 'ethers';
import {AlchemyHelper, CurrencyHelper, ToastHelper} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeCreateScheduledTransactionModal,
  selectAddressMap,
  selectContactMap,
  selectCurrentAddress,
  selectSendTokensModal,
  selectSendTokensScheduledModal,
} from '../../store';
import {Contact} from 'expo-contacts';
import {
  ContactDropdown,
  CurrencyDropdown,
  CurrencyDropdownType,
  DurationDropdown,
} from '../dropdowns';
import {TimeUnit} from '@notifee/react-native';
import {ModalAddress} from '../walletconnect';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorRoutes} from '../../../types/navigation';
import {useQueryClient} from '@tanstack/react-query';
import {Loader, optimizeHeavyScreen} from '../misc';

type SendTokensProps = {
  type:
    | 'SEND'
    | 'CREATE_TRANSACTION'
    | 'SCHEDULED_TRANSACTION'
    | 'SEND_WITH_PARAMS';
};

const SendTokensComponent = ({type}: SendTokensProps) => {
  const themedStyles = useThemedStyles(styles);
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState<Contact | undefined>(undefined);
  const [currency, setCurrency] = useState<CurrencyDropdownType | undefined>(
    undefined,
  );
  const [error, setError] = useState<{
    amount: string | null;
    page: string | null;
  }>({amount: null, page: null});
  const [isLoading, setIsLoading] = useState(false);
  const [interval, setInterval] = useState('1');
  const [duration, setDuration] = useState<TimeUnit>();
  const [description, setDescription] = useState<string>('');

  const [estimatedGas, setEstimatedGas] = useState<ethers.BigNumber>();
  const {data: gasPrice} = useGasPriceQuery();
  const currentAddress = useSelector(selectCurrentAddress);
  const contactMap = useSelector(selectContactMap);
  const addressMap = useSelector(selectAddressMap);
  const {data: nativeBalance} = useNativeBalanceQuery(currentAddress);
  const {transfer} = useTransfer();
  const {createNewScheduledTransaction} = useScheduledTransaction();
  const sendTokensScheduledModal = useSelector(selectSendTokensScheduledModal);
  const sendTokensModal = useSelector(selectSendTokensModal);
  const dispatch = useDispatch();
  const {data: savedContacts} = useSavedContacts();
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<DrawerNavigationProp<DrawerNavigatorRoutes, 'SendMoney'>>();

  useEffect(() => {
    if (type === 'SEND_WITH_PARAMS') {
      if (sendTokensModal.isOpen && sendTokensModal.transaction) {
        setAmount(sendTokensModal.transaction.amount);
        setCurrency(sendTokensModal.transaction.currency);
        setTo(sendTokensModal.transaction.to);
      }
    }
  }, [sendTokensModal, type]);

  useEffect(() => {
    if (type === 'SCHEDULED_TRANSACTION') {
      if (
        sendTokensScheduledModal.isOpen &&
        sendTokensScheduledModal.scheduledTransaction
      ) {
        console.log('Scheduled to', {
          to: sendTokensScheduledModal.scheduledTransaction.to,
          addressMap,
        });
        console.log(
          'addr',
          ethers.utils.getAddress(
            sendTokensScheduledModal.scheduledTransaction.to.toLowerCase(),
          ),
        );
        const contactId =
          addressMap[
            sendTokensScheduledModal.scheduledTransaction.to.toLowerCase()
          ]?.contactId ||
          addressMap[
            ethers.utils.getAddress(
              sendTokensScheduledModal.scheduledTransaction.to.toLowerCase(),
            )
          ]?.contactId;
        if (!contactId) {
          ToastHelper.show({
            type: 'error',
            autoHide: true,
            text1: 'Error',
            text2: 'Failed to find contact',
          });
          return;
        }
        setAmount(sendTokensScheduledModal.scheduledTransaction.amount);
        setCurrency(sendTokensScheduledModal.scheduledTransaction.currency);
        setDescription(
          sendTokensScheduledModal.scheduledTransaction.description,
        );
        const contact = savedContacts?.find(c => c.id === contactId);
        if (!contact) {
          ToastHelper.show({
            type: 'error',
            autoHide: true,
            text1: 'Error',
            text2: 'Failed to find contact',
          });
          return;
        }
        setTo(contact);
      }
    }
  }, [type, sendTokensScheduledModal, addressMap, savedContacts]);

  const currentBalance = useMemo(() => {
    if (currency && currency.balance && currency.decimals) {
      return CurrencyHelper.computeBalanceFromHex(
        currency.balance,
        currency.decimals,
      );
    }
  }, [currency]);

  useEffect(() => {
    if (type === 'SEND' || type === 'SCHEDULED_TRANSACTION') {
      const debounceInterval = setTimeout(() => {
        if (
          currentAddress &&
          to &&
          to.id &&
          contactMap[to.id]?.address &&
          currency
        ) {
          let val = amount !== '' ? amount : '0';
          AlchemyHelper.estimateGas({
            from: currentAddress,
            to: contactMap[to.id].address,
            value: ethers.utils.parseEther(val),
          })
            .then(estimation => {
              setEstimatedGas(estimation);
              if (nativeBalance !== undefined && gasPrice !== undefined) {
                const gasCost = gasPrice.mul(estimation);
                const amnt = ethers.utils.parseEther(val);
                if (
                  (currency.address === CONSTANTS.ZERO_ADDRESS &&
                    gasCost.add(amnt).gt(nativeBalance)) ||
                  (currency.address !== CONSTANTS.ZERO_ADDRESS &&
                    gasCost.gt(nativeBalance))
                ) {
                  setError(e => ({...e, amount: 'Insufficient balance'}));
                }
              }
            })
            .catch(err => {
              let errMsg: string =
                err?.message?.split('[')?.[0] ?? 'Unknown error';
              errMsg = errMsg.charAt(0).toUpperCase() + errMsg.slice(1);
              setError(e => ({...e, amount: errMsg}));
            });
        }
      }, 2000);

      return () => clearTimeout(debounceInterval);
    }
  }, [
    type,
    amount,
    contactMap,
    currency,
    currentAddress,
    gasPrice,
    nativeBalance,
    to,
  ]);

  const handleChangeAmount = (val: string) => {
    if (currentBalance !== undefined) {
      setAmount(val);
    }
    setError(prev => ({...prev, amount: null}));
  };

  const handleSetMaxAmount = () => {
    if (currency && currency.address === CONSTANTS.ZERO_ADDRESS) {
      if (estimatedGas && nativeBalance && gasPrice) {
        const gasCost = gasPrice.mul(Number(estimatedGas));
        const ethBalance = ethers.utils.parseEther(
          ethers.utils.formatUnits(nativeBalance, 'ether'),
        );
        if (ethBalance.gt(gasCost)) {
          handleChangeAmount(ethers.utils.formatEther(ethBalance.sub(gasCost)));
        }
      }
    } else {
      if (currentBalance) {
        handleChangeAmount(currentBalance.toString());
      }
    }
  };

  const handleSend = async () => {
    if (!to) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'Please select a contact',
      });
      return;
    } else if (!currency) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'Please select a currency',
      });
      return;
    }
    if (
      type === 'SEND' ||
      type === 'SCHEDULED_TRANSACTION' ||
      type === 'SEND_WITH_PARAMS'
    ) {
      if (!estimatedGas) {
        ToastHelper.show({
          type: 'info',
          autoHide: true,
          text1: 'Please wait...',
          text2: 'Please wait for gas estimation to complete',
        });
        return;
      }
      try {
        setIsLoading(true);
        await transfer({
          to,
          amount,
          currency,
          gasLimit: ethers.BigNumber.from(estimatedGas),
        });
        ToastHelper.show({
          type: 'success',
          autoHide: true,
          text1: 'Success',
          text2: 'Transfer successful!',
        });
        queryClient.invalidateQueries({queryKey: [QUERY.TRANSACTIONS_TO]});
        navigation.navigate('Home');
      } catch (err: any) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: err.message ?? 'Failed to send tokens',
        });
      } finally {
        setIsLoading(false);
      }
    } else if (type === 'CREATE_TRANSACTION') {
      if (!/^\d+$/.test(interval)) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: 'Interval must be a number',
        });
        return;
      } else if (!duration) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: 'Please select a duration',
        });
        return;
      } else if (description.length < 5) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: 'Description must be at least 5 characters',
        });
        return;
      } else if (duration === 'MINUTES' && Number(interval) < 15) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: 'Duration must be at least 15 minutes',
        });
        return;
      }
      try {
        setIsLoading(true);
        await createNewScheduledTransaction({
          amount,
          currency,
          to,
          repeatsEvery: Number(interval),
          timeUnit: duration,
          description,
        });
        dispatch(closeCreateScheduledTransactionModal());
        ToastHelper.show({
          type: 'success',
          autoHide: true,
          text1: 'Success',
          text2: 'Scheduled transaction created successfully',
        });
      } catch (err: any) {
        ToastHelper.show({
          type: 'error',
          autoHide: true,
          text1: 'Error',
          text2: err.message ?? 'Failed to create scheduled transaction',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={themedStyles[type]}>
      <ModalAddress />
      {type === 'SCHEDULED_TRANSACTION' && (
        <View style={themedStyles.dropdownContainer}>
          <Text style={themedStyles.input} numberOfLines={1}>
            {description}
          </Text>
        </View>
      )}
      <View style={themedStyles.dropdownContainer}>
        <ContactDropdown
          onChange={val => setTo(val)}
          value={to}
          disabled={type === 'SCHEDULED_TRANSACTION'}
        />
      </View>
      <View style={themedStyles.dropdownContainer}>
        <CurrencyDropdown
          onChange={val => setCurrency(val)}
          value={currency}
          disabled={type === 'SCHEDULED_TRANSACTION'}
        />
      </View>
      {currency && (
        <View style={themedStyles.dropdownContainer}>
          <TextInput
            value={amount}
            onChangeText={handleChangeAmount}
            keyboardType="numeric"
            returnKeyType="done"
            placeholder="Enter amount to send"
            placeholderTextColor={themedStyles.placeholder.color}
            style={themedStyles.input}
            editable={type !== 'SCHEDULED_TRANSACTION'}
          />
          {(type === 'SEND' ||
            type === 'SCHEDULED_TRANSACTION' ||
            type === 'SEND_WITH_PARAMS') && (
            <>
              {currentBalance !== undefined && (
                <View style={themedStyles.spaceBetween}>
                  <Text style={themedStyles.label}>Current Balance:</Text>
                  <View style={themedStyles.row}>
                    <Text style={themedStyles.value}>{currentBalance}</Text>
                    {estimatedGas &&
                      nativeBalance &&
                      (type === 'SEND' || type === 'SEND_WITH_PARAMS') && (
                        <GestureButton>
                          <IradaButton
                            color="orange"
                            style={themedStyles.useButton}
                            onPress={handleSetMaxAmount}>
                            Max
                          </IradaButton>
                        </GestureButton>
                      )}
                  </View>
                </View>
              )}
              {gasPrice !== undefined && (
                <View style={themedStyles.spaceBetween}>
                  <Text style={themedStyles.label}>Gas Price:</Text>
                  <Text style={themedStyles.value}>
                    {ethers.utils.formatUnits(gasPrice.toHexString(), 'gwei')}{' '}
                    gwei
                  </Text>
                </View>
              )}
              {estimatedGas && (
                <View style={themedStyles.spaceBetween}>
                  <Text style={themedStyles.label}>Estimated Gas:</Text>
                  <Text style={themedStyles.value}>
                    {estimatedGas.toString()} gas
                  </Text>
                </View>
              )}
              {error.amount && (
                <Text style={themedStyles.error}>{error.amount}</Text>
              )}
            </>
          )}
        </View>
      )}
      {type === 'CREATE_TRANSACTION' && (
        <>
          <View style={themedStyles.dropdownContainer}>
            <Text style={themedStyles.labelDate}>Repeats every:</Text>
            <TextInput
              returnKeyType="done"
              style={themedStyles.input}
              value={interval}
              onChangeText={txt => setInterval(txt)}
              keyboardType="number-pad"
            />
            <DurationDropdown onChange={val => setDuration(val)} />
          </View>
          <View style={themedStyles.dropdownContainer}>
            <Text style={themedStyles.labelDate}>Description:</Text>
            <TextInput
              returnKeyType="done"
              style={themedStyles.input}
              value={description}
              onChangeText={txt => setDescription(txt)}
              keyboardType="default"
            />
          </View>
        </>
      )}
      <GestureButton style={themedStyles.submitButton}>
        <IradaButton color="purple" onPress={handleSend} loading={isLoading}>
          {type === 'CREATE_TRANSACTION' ? 'Save' : 'Send'}
        </IradaButton>
      </GestureButton>
    </View>
  );
};

export const SendTokens = optimizeHeavyScreen(SendTokensComponent, Loader);

const styles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      color: theme.text,
      fontSize: 16,
      paddingVertical: 8,
    },
    submitButton: {
      marginTop: 16,
    },
    placeholder: {
      color: theme.lightText,
    },
    dropdownContainer: {
      marginVertical: 8,
      backgroundColor: theme.container,
      borderRadius: 8,
      padding: 8,
      paddingHorizontal: 12,
    },
    error: {
      color: theme.orange,
      fontSize: 16,
      textAlign: 'center',
      marginTop: 12,
    },
    value: {
      color: theme.text,
      fontSize: 14,
    },
    spaceBetween: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: {
      color: theme.text,
      fontSize: 15,
      fontWeight: '500',
    },
    labelDate: {
      color: theme.text,
      fontSize: 15,
      fontWeight: '500',
      marginBottom: 8,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    useButton: {
      padding: 4,
      borderRadius: 6,
    },
    transparentButton: {
      paddingVertical: 8,
      paddingHorizontal: 0,
    },
    transparentButtonText: {
      textAlign: 'left',
    },
    CREATE_TRANSACTION: {
      marginTop: 16,
      marginBottom: 48,
    },
    SEND: {},
    SCHEDULED_TRANSACTION: {
      marginTop: 16,
      marginBottom: 48,
    },
    SEND_WITH_PARAMS: {
      marginTop: 16,
      marginBottom: 48,
    },
  });
