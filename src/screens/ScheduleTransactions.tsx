import React from 'react';
import {
  DrawerLayout,
  GestureButton,
  Header,
  IradaButton,
  ScheduledList,
} from '../components';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Theme} from '../config';
import {StyleSheet} from 'react-native';
import {useThemedStyles} from '../hooks';
import {useDispatch} from 'react-redux';
import {openCreateScheduledTransactionModal} from '../store';

export const ScheduleTransactions = () => {
  const themedStyles = useThemedStyles(styles);
  const dispatch = useDispatch();

  const handleOpenScheduledTransactionsModal = () => {
    dispatch(openCreateScheduledTransactionModal(true));
  };

  return (
    <DrawerLayout>
      <Header title="Schedule Transactions" />
      <ScheduledList />
      <GestureButton style={themedStyles.plusButton}>
        <IradaButton
          color="purple"
          style={themedStyles.plusIcon}
          onPress={handleOpenScheduledTransactionsModal}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </IradaButton>
      </GestureButton>
    </DrawerLayout>
  );
};

const styles = (_: Theme) =>
  StyleSheet.create({
    plusIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      padding: 0,
    },
    plusButton: {
      position: 'absolute',
      bottom: 30,
      right: 30,
    },
  });
