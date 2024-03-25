import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useChain, useThemedStyles} from '../../hooks';
import {useSelector} from 'react-redux';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {selectChains, selectCurrentChain} from '../../store';
import {Chain} from '../../config/chain';
import {ToastHelper} from '../../helpers';

const ChainItem = ({chain}: {chain: Chain}) => {
  const themedStyles = useThemedStyles(styles);
  return (
    <View style={themedStyles.item}>
      <Image source={{uri: chain.image}} style={themedStyles.chainImage} />
      <Text style={themedStyles.name}>{chain.name}</Text>
    </View>
  );
};

export const ChainButton = () => {
  const themedStyles = useThemedStyles(styles);
  const chains = useSelector(selectChains);
  const currentChain = useSelector(selectCurrentChain);
  const {changeChain} = useChain();

  const opacityValue = useSharedValue(0);

  const handleChangeCurrentChain = async (chainId: string) => {
    try {
      handleToggleModal(false);
      await changeChain(chainId);
    } catch {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Error',
        text2: 'Failed to switch chain',
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
          horizontal={true}
          nestedScrollEnabled={true}
          contentContainerStyle={themedStyles.flexGrow}
          showsHorizontalScrollIndicator={false}>
          <FlatList
            scrollEnabled={true}
            data={chains}
            nestedScrollEnabled={true}
            keyExtractor={item => item.chainId}
            renderItem={({item}) => {
              if (item.chainId === currentChain?.chainId) {
                return null;
              }
              return (
                <Pressable
                  onPress={() => handleChangeCurrentChain(item.chainId)}>
                  <ChainItem chain={item} />
                </Pressable>
              );
            }}
          />
        </ScrollView>
      </Animated.View>

      <Pressable
        onPress={() => handleToggleModal()}
        style={themedStyles.button}>
        {currentChain && <ChainItem chain={currentChain} />}
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
    name: {
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
    chainImage: {
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
