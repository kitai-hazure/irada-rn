import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {QUERY, Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAccount,
  selectAccounts,
  selectCurrentAddress,
  selectCurrentPrivateKey,
  selectMnemonic,
  setCurrentAccountIndex,
  setCurrentPrivateKey,
} from '../../store';
import {Wallet} from 'ethers';
import {AddressHelper, KeychainHelper, MnemonicHelper} from '../../helpers';
import makeBlockie from 'ethereum-blockies-base64';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {AntDesign} from '@expo/vector-icons';
import {FlatList} from 'react-native-gesture-handler';
import {useQueryClient} from '@tanstack/react-query';

export const AccountButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const themedStyles = useThemedStyles(styles);
  const accounts = useSelector(selectAccounts);
  const currentPrivateKey = useSelector(selectCurrentPrivateKey);
  const mnemonic = useSelector(selectMnemonic);
  const currentAddress = useSelector(selectCurrentAddress);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const opacityValue = useSharedValue(0);

  const handleCreateNewAccount = async () => {
    handleToggleModal(false);
    setIsLoading(true);
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
      });
      dispatch(setCurrentAccountIndex(accounts.length));
      dispatch(setCurrentPrivateKey(privateKey));
      dispatch(addAccount({privateKey, address}));
      handleInvalidateQueries();
      setIsLoading(false);
    }
  };

  const handleChangeCurrentAccount = async (
    account: {privateKey: string; address: string},
    index: number,
  ) => {
    if (mnemonic) {
      handleToggleModal(false);
      dispatch(setCurrentPrivateKey(account.privateKey));
      dispatch(setCurrentAccountIndex(index));
      await KeychainHelper.set({
        accountCount: accounts.length,
        mnemonic: mnemonic,
        privateKey: account.privateKey,
      });
      handleInvalidateQueries();
    }
  };

  const handleToggleModal = (state?: boolean) => {
    let nextValue = opacityValue.value === 0 ? 1 : 0;
    if (state !== undefined) {
      nextValue = state ? 1 : 0;
    }
    opacityValue.value = withSpring(nextValue, {
      duration: 500,
    });
  };
  const handleInvalidateQueries = async () => {
    queryClient.invalidateQueries({queryKey: [QUERY.TRANSACTIONS_TO]});
    queryClient.invalidateQueries({queryKey: [QUERY.TRANSACTIONS_FROM]});
    queryClient.invalidateQueries({queryKey: [QUERY.TOKEN_HOLDINGS]});
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      display: opacityValue.value === 0 ? 'none' : 'flex',
    };
  });

  return (
    <View>
      <Animated.View
        entering={FadeInDown.springify().damping(15)}
        style={[themedStyles.dropdown, animatedStyle, {opacity: opacityValue}]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          nestedScrollEnabled={true}
          contentContainerStyle={themedStyles.flexGrow}>
          <FlatList
            scrollEnabled={true}
            data={accounts}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.address}
            ListFooterComponent={
              <Pressable
                onPress={() => handleCreateNewAccount()}
                disabled={isLoading}
                style={themedStyles.addAccountButton}>
                {accounts.length > 1 && <View style={themedStyles.border} />}
                <AntDesign
                  name="pluscircle"
                  size={24}
                  color={themedStyles.theme.text}
                />
                <Text style={themedStyles.address}>Add account</Text>
              </Pressable>
            }
            renderItem={({item: account, index}) => {
              if (account.privateKey === currentPrivateKey) {
                return null;
              }
              return (
                <Pressable
                  style={themedStyles.item}
                  onPress={() => handleChangeCurrentAccount(account, index)}>
                  <Image
                    source={{uri: makeBlockie(account.address)}}
                    style={themedStyles.blockie}
                  />
                  <Text style={themedStyles.address}>
                    {AddressHelper.formatAddress(account.address, 6)}
                  </Text>
                </Pressable>
              );
            }}
          />
        </ScrollView>
      </Animated.View>

      <Pressable
        onPress={() => handleToggleModal()}
        style={themedStyles.button}>
        {currentAddress && (
          <>
            {isLoading ? (
              <View style={themedStyles.centeredItem}>
                <ActivityIndicator
                  size={'small'}
                  color={themedStyles.theme.purple}
                />
              </View>
            ) : (
              <View style={themedStyles.item}>
                <Image
                  source={{uri: makeBlockie(currentAddress)}}
                  style={themedStyles.blockie}
                />
                <Text style={themedStyles.address}>
                  {AddressHelper.formatAddress(currentAddress, 6)}
                </Text>
              </View>
            )}
          </>
        )}
      </Pressable>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.container,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.purple,
      position: 'relative',
      padding: 16,
      paddingVertical: 8,
    },
    address: {
      fontSize: 14,
      color: theme.text,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    centeredItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      justifyContent: 'center',
    },
    blockie: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 8,
    },
    dropdown: {
      zIndex: 3,
      elevation: 3,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 65,
      backgroundColor: theme.container,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.purple,
      paddingHorizontal: 16,
      paddingVertical: 8,
      maxHeight: 200,
      overflow: 'scroll',
    },
    addAccountButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      gap: 8,
      width: '100%',
    },
    border: {
      borderTopColor: theme.lightText,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    hide: {
      display: 'none',
    },
    alignCenter: {
      alignSelf: 'center',
    },
    flexGrow: {
      flexGrow: 1,
    },
  });
