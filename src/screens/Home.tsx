import {FlatList, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {Theme} from '../config';
import {useThemedStyles} from '../hooks';
import {DrawerLayout, Header, HeroButton} from '../components';

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import {
  DrawerNavigationProps,
  DrawerNavigatorRoutes,
} from '../../types/navigation';
import {Camera} from 'expo-camera';
import {AddressHelper} from '../helpers';
import {useSelector} from 'react-redux';
import {selectCurrentAddress} from '../store';

export type HeroButtonType = {
  title: string;
  icon: React.JSX.Element;
  onPress: () => void;
};

export const Home = ({
  navigation,
}: DrawerNavigationProps<DrawerNavigatorRoutes, 'Home'>) => {
  const themedStyles = useThemedStyles(styles);
  const currentAddress = useSelector(selectCurrentAddress);

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
        title: 'Swap',
        icon: (
          <MaterialIcons
            name="swap-horizontal-circle"
            size={24}
            color={themedStyles.theme.text}
          />
        ),
        onPress: () => navigation.navigate('Swap'),
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
          console.log('Token Balances');
          navigation.navigate('TokenBalances');
        },
      },
    ];
  }, [themedStyles.theme.text, navigation]);

  return (
    <DrawerLayout>
      <Header
        title={`Welcome${
          currentAddress
            ? `, ${AddressHelper.formatAddress(currentAddress)}`
            : ''
        }`}
      />
      <FlatList
        data={heroButtons}
        numColumns={3}
        style={themedStyles.heroList}
        columnWrapperStyle={themedStyles.iconContainer}
        renderItem={({item}) => <HeroButton item={item} />}
        contentContainerStyle={themedStyles.heroContainer}
        keyExtractor={(_, index) => index.toString()}
      />
    </DrawerLayout>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      color: theme.text,
    },
    heroContainer: {
      gap: 32,
    },
    heroList: {
      marginTop: 16,
    },
  });
