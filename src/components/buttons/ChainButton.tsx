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
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import {useQueryClient} from '@tanstack/react-query';
import {selectChains, selectCurrentChain} from '../../store';

export const ChainButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const themedStyles = useThemedStyles(styles);
  const dispatch = useDispatch();
  const chains = useSelector(selectChains);
  const currentChain = useSelector(selectCurrentChain);

  const queryClient = useQueryClient();

  const opacityValue = useSharedValue(0);

  const handleChangeCurrentChain = async (chainId: string) => {};

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
        <ScrollView horizontal={true}>
          <FlatList
            scrollEnabled={true}
            data={chains}
            nestedScrollEnabled={true}
            keyExtractor={item => item.address}
            renderItem={({item, index}) => {
              if (item.chainId === currentChain.chainId) {
                return null;
              }
              return (
                <Pressable
                  style={themedStyles.item}
                  onPress={() => handleChangeCurrentChain(item.chainId)}>
                  <Image
                    source={{uri: item.image}}
                    style={themedStyles.blockie}
                  />
                  <Text style={themedStyles.address}>{item.name}</Text>
                </Pressable>
              );
            }}
          />
        </ScrollView>
      </Animated.View>

      <Pressable
        onPress={() => handleToggleModal()}
        style={themedStyles.button}>
        {currentChain && (
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
                  source={{uri: currentChain.image}}
                  style={themedStyles.blockie}
                />
                <Text style={themedStyles.address}>{currentChain.name}</Text>
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
  });
