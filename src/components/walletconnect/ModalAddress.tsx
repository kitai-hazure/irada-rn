import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AddressButton} from '../buttons';
import makeBlockie from 'ethereum-blockies-base64';
import {useSelector} from 'react-redux';
import {selectCurrentAddress, selectCurrentChain} from '../../store';
import {useThemedStyles} from '../../hooks';
import {Theme} from '../../config';

export const ModalAddress = () => {
  const currentAddress = useSelector(selectCurrentAddress);
  const themedStyles = useThemedStyles(styles);
  const currentChain = useSelector(selectCurrentChain);

  return (
    <>
      {currentAddress && (
        <View style={themedStyles.infoContainer}>
          <View style={themedStyles.accountContainer}>
            <Image
              source={{uri: makeBlockie(currentAddress)}}
              style={themedStyles.accountIcon}
            />
            <AddressButton address={currentAddress} />
          </View>
          <View style={themedStyles.accountContainer}>
            <Image
              style={themedStyles.chainIcon}
              source={{uri: currentChain.image}}
            />
            <Text style={themedStyles.origin}>{currentChain.name}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    accountIcon: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignSelf: 'center',
    },
    chainIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      alignSelf: 'center',
    },
    accountContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      justifyContent: 'space-between',
      marginHorizontal: 8,
    },
    origin: {
      color: theme.text,
      fontSize: 16,
      textAlign: 'center',
    },
  });
