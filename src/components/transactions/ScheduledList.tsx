import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CHAINS, Theme} from '../../config';
import {GestureButton, IradaButton} from '../buttons';
import {useScheduledTransaction, useThemedStyles} from '../../hooks';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ContactOrAddr} from '../contact';
import Animated, {SlideInLeft, SlideInRight} from 'react-native-reanimated';
import {Empty} from '../misc';

export const ScheduledList = () => {
  const themedStyles = useThemedStyles(styles);
  const {scheduledTransactions, deleteScheduledTransaction} =
    useScheduledTransaction();

  if (scheduledTransactions.length === 0) {
    return <Empty message="No scheduled transactions" />;
  }

  return (
    <FlatList
      data={scheduledTransactions}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <Animated.View
            entering={SlideInRight}
            exiting={SlideInLeft}
            style={themedStyles.container}>
            <View style={themedStyles.row}>
              <Text style={themedStyles.label}>Desc:</Text>
              <Text style={themedStyles.value} numberOfLines={1}>
                {item.description}
              </Text>
            </View>
            <View style={themedStyles.row}>
              <Text style={themedStyles.label}>To:</Text>
              <ContactOrAddr address={item.to} />
            </View>
            <View style={themedStyles.row}>
              <Text style={themedStyles.label}>Amount:</Text>
              <Text style={themedStyles.value} numberOfLines={1}>
                {item.amount} {item.currency.symbol} on{' '}
                {CHAINS[item.chain].name}
              </Text>
            </View>
            <View style={themedStyles.row}>
              <Text style={themedStyles.label}>Started on:</Text>
              <Text style={themedStyles.value} numberOfLines={1}>
                {new Date(item.start).toLocaleString()}
              </Text>
            </View>
            <View style={themedStyles.row}>
              <Text style={themedStyles.label}>Repeats every:</Text>
              <Text style={themedStyles.value} numberOfLines={1}>
                {item.repeatsEvery} {item.timeUnit.toLowerCase()}
              </Text>
            </View>
            <GestureButton>
              <IradaButton
                color="orange"
                onPress={() => deleteScheduledTransaction(item.id)}
                style={themedStyles.deleteButton}>
                <MaterialCommunityIcons
                  name="delete"
                  color={themedStyles.theme.white}
                  size={24}
                />
              </IradaButton>
            </GestureButton>
          </Animated.View>
        );
      }}
    />
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 12,
      backgroundColor: theme.container,
      borderRadius: 16,
      marginVertical: 8,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.text,
      marginRight: 10,
    },
    value: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.text,
    },
    deleteButton: {
      paddingVertical: 8,
      marginTop: 12,
    },
  });
