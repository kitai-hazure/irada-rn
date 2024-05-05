import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {CONSTANTS, Theme} from '../config';
import {useNativeBalanceQuery, useThemedStyles} from '../hooks';
import {DrawerLayout, Header, HeroButton} from '../components';

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import {
  DrawerNavigationProps,
  DrawerNavigatorRoutes,
} from '../../types/navigation';
import {Camera} from 'expo-camera';
import {FormatHelper} from '../helpers';
import {useSelector} from 'react-redux';
import {selectCurrentAddress, selectCurrentChain} from '../store';
import Animated, {FadeIn} from 'react-native-reanimated';
import {ethers} from 'ethers';

export type HeroButtonType = {
  title: string;
  icon: React.JSX.Element;
  onPress: () => void;
};

const HomeScreen = ({
  navigation,
}: DrawerNavigationProps<DrawerNavigatorRoutes, 'Home'>) => {
  const themedStyles = useThemedStyles(styles);
  const currentAddress = useSelector(selectCurrentAddress);
  const chain = useSelector(selectCurrentChain);
  const {data: nativeBalance} = useNativeBalanceQuery(currentAddress);

  const heroButtons: HeroButtonType[] = useMemo(() => {
    return [
      {
        title: 'Connect to a dapp',
        icon: (
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={24}
            color={themedStyles.theme.text}
          />
        ),
        onPress: () => {
          Camera.requestCameraPermissionsAsync().then(value => {
            if (value.granted) {
              navigation.navigate('Scan');
            }
          });
        },
      },
      {
        title: 'Transfer history',
        icon: (
          <MaterialIcons
            name="history"
            size={24}
            color={themedStyles.theme.text}
          />
        ),
        onPress: () => navigation.navigate('TransactionHistory'),
      },
      {
        title: 'Token Balances',
        icon: (
          <FontAwesome5
            name="coins"
            size={24}
            color={themedStyles.theme.text}
          />
        ),
        onPress: () => {
          navigation.navigate('TokenBalances');
        },
      },
    ];
  }, [themedStyles.theme.text, navigation]);

  const fadeInDelays = {
    balance: 200,
    heroButtons: 400,
    banner1: 600 + heroButtons.length * 200,
    banner2: 800 + heroButtons.length * 200,
    banner3: 1000 + heroButtons.length * 200,
  };

  return (
    <DrawerLayout>
      <Header
        title={`Welcome${
          currentAddress
            ? `, ${FormatHelper.formatAddress(currentAddress)}`
            : ''
        }`}
        Icon={
          <Ionicons name="menu" size={26} color={themedStyles.theme.text} />
        }
      />
      <Animated.View
        style={themedStyles.container}
        entering={FadeIn.delay(fadeInDelays.balance)}>
        <Text style={themedStyles.balance}>Balance</Text>
        <Text style={themedStyles.balanceValue} numberOfLines={1}>
          {nativeBalance
            ? `${ethers.utils.formatEther(nativeBalance).slice(0, 6)} ${
                chain.nativeCurrency.symbol
              }`
            : 'Loading...'}
        </Text>
      </Animated.View>
      <View style={themedStyles.heroContainer}>
        <View style={themedStyles.iconContainer}>
          {heroButtons.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeIn.delay(fadeInDelays.heroButtons + index * 200)}>
              <HeroButton key={index} item={item} />
            </Animated.View>
          ))}
        </View>
      </View>
      <Animated.View
        style={themedStyles.banner}
        entering={FadeIn.delay(fadeInDelays.banner1)}>
        <Text style={themedStyles.bannerTitle}>Voice assistant</Text>
        <Text style={themedStyles.bannerText}>
          Use your device's voice assistant to interact with Irada.Ask your
          assistant to send tokens, check your balance, and more. Try saying
          <Text style={themedStyles.bannerHighlight}>
            {` ${CONSTANTS.ASSISTANT_PROMPT}`}, send 1 ETH to Alice on Sepolia"
          </Text>
        </Text>
      </Animated.View>
      <Animated.View
        style={themedStyles.banner}
        entering={FadeIn.delay(fadeInDelays.banner2)}>
        <Text style={themedStyles.bannerTitle}>
          What can you do with Irada?
        </Text>
        <Text style={themedStyles.bannerText}>
          Send and receive tokens, interact with smart contracts, and more.
        </Text>
      </Animated.View>
      <Animated.View
        style={themedStyles.banner}
        entering={FadeIn.delay(fadeInDelays.banner3)}>
        <Text style={themedStyles.bannerTitle}>Schedule Transactions!</Text>
        <Text style={themedStyles.bannerText}>
          Want to send tokens at regular intervals? Schedule transactions with
          Irada.
        </Text>
      </Animated.View>
    </DrawerLayout>
  );
};

export const Home = React.memo(HomeScreen);

const styles = (theme: Theme) =>
  StyleSheet.create({
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 80,
    },
    text: {
      color: theme.text,
    },
    heroContainer: {
      gap: 32,
    },
    heroList: {
      marginTop: 16,
      flexGrow: 0,
    },
    container: {
      padding: 16,
      borderRadius: 1,
      marginBottom: 16,
    },
    balance: {
      color: theme.text,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    balanceValue: {
      color: theme.purple,
      fontSize: 40,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    banner: {
      backgroundColor: theme.purple,
      padding: 16,
      borderRadius: 12,
      marginTop: 16,
    },
    bannerTitle: {
      color: theme.text,
      fontSize: 17,
      fontWeight: 'bold',
    },
    bannerText: {
      color: theme.text,
      fontSize: 13,
    },
    bannerHighlight: {
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    bannerWrapper: {
      marginTop: 8,
    },
  });
