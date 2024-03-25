import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../../config';
import {useAccount, useThemedStyles, useWallet} from '../../hooks';
import {useSelector} from 'react-redux';
import {
  selectAccounts,
  selectCurrentAddress,
  selectCurrentChainId,
  selectCurrentPrivateKey,
} from '../../store';
import {FormatHelper, ToastHelper} from '../../helpers';
import makeBlockie from 'ethereum-blockies-base64';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {AntDesign, Feather} from '@expo/vector-icons';
import {FlatList} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import {GestureButton} from './GestureButton';

const AccountItem = ({address}: {address: string}) => {
  const themedStyles = useThemedStyles(styles);

  return (
    <View style={themedStyles.item}>
      <Image
        source={{uri: makeBlockie(address)}}
        style={themedStyles.blockie}
      />
      <Text style={themedStyles.address}>
        {FormatHelper.formatAddress(address, 6)}
      </Text>
      <GestureButton>
        <Pressable style={themedStyles.copyIcon}>
          <Feather
            name="copy"
            size={14}
            color={themedStyles.theme.green}
            onPress={() => {
              Clipboard.setString(address);
            }}
          />
        </Pressable>
      </GestureButton>
    </View>
  );
};

export const AccountButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const themedStyles = useThemedStyles(styles);
  const accounts = useSelector(selectAccounts);
  const currentPrivateKey = useSelector(selectCurrentPrivateKey);
  const currentAddress = useSelector(selectCurrentAddress);
  const currentChainId = useSelector(selectCurrentChainId);
  const {changeAccount} = useWallet();
  const {createNewAccount, changeCurrentAccount} = useAccount();

  const opacityValue = useSharedValue(0);

  const handleCreateNewAccount = async () => {
    handleToggleModal(false);
    setIsLoading(true);
    try {
      const res = await createNewAccount();
      if (res?.address) {
        changeAccount({address: res.address, chainId: currentChainId});
      }
    } catch (e) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'Failed to create new account',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeCurrentAccount = async (
    account: {privateKey: string; address: string},
    index: number,
  ) => {
    handleToggleModal(false);
    try {
      await changeCurrentAccount(account, index);
    } catch (e) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'Failed to change account',
      });
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
                <Text style={themedStyles.text}>Add account</Text>
              </Pressable>
            }
            renderItem={({item: account, index}) => {
              if (account.privateKey === currentPrivateKey) {
                return null;
              }
              return (
                <Pressable
                  onPress={() => handleChangeCurrentAccount(account, index)}>
                  <AccountItem address={account.address} />
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
              <AccountItem address={currentAddress} />
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
      fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    },
    text: {
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
    copyIcon: {
      marginLeft: 8,
    },
  });
