import {StyleSheet, View, Text, Dimensions, Pressable} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedRef,
  withTiming,
  Easing,
  useAnimatedReaction,
  scrollTo,
} from 'react-native-reanimated';
import {OnboardingSlide} from '../components';
import {DARK_THEME, Theme} from '../config';
import {GestureButton} from '../components';
import {useThemedStyles} from '../hooks';
import {AntDesign} from '@expo/vector-icons';
import {AppNavigatorRoutes, StackNavigationProps} from '../../types/navigation';
import {CommonActions} from '@react-navigation/native';

const width = Dimensions.get('screen').width;

export type OnboardingData = {
  title: string;
  description: string;
  animation: any;
  bg: string;
};

const onboardingData: Array<OnboardingData> = [
  {
    title: 'Irada',
    description: 'Your web3 wallet and assistant',
    animation: require('../../assets/animations/wallet.json'),
    bg: DARK_THEME.orange,
  },
  {
    title: 'Voice Assistant',
    description:
      'Interactive native voice Assistant to cater to all your needs',
    animation: require('../../assets/animations/voice.json'),
    bg: DARK_THEME.purple,
  },
  {
    title: 'Get Started',
    description:
      'Get started with Irada by importing your wallet or creating a new one',
    animation: require('../../assets/animations/wallet.json'),
    bg: DARK_THEME.green,
  },
];

export const Onboarding = ({
  navigation,
}: StackNavigationProps<AppNavigatorRoutes, 'Onboarding'>) => {
  const themedStyles = useThemedStyles(styles);
  const ref = useAnimatedRef<Animated.FlatList<OnboardingData>>();
  const scrollX = useSharedValue(0);

  const onPress = () => {
    scrollX.value = withTiming(scrollX.value + width, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    if (scrollX.value > (onboardingData.length - 2) * width) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'EnableContacts'}],
        }),
      );
    }
  };

  useAnimatedReaction(
    () => scrollX.value,
    () => scrollTo(ref, scrollX.value, 0, true),
  );

  return (
    <View style={themedStyles.container}>
      <Animated.FlatList
        ref={ref}
        data={onboardingData}
        renderItem={({item, index}) => {
          return (
            <OnboardingSlide item={item} index={index} scrollX={scrollX} />
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
      <View style={themedStyles.bottom}>
        <GestureButton>
          <Pressable onPress={onPress} style={[themedStyles.button]}>
            <Text style={themedStyles.buttonText}>Next</Text>
            <AntDesign
              name="arrowright"
              size={20}
              color={themedStyles.theme.white}
            />
          </Pressable>
        </GestureButton>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 30,
      paddingVertical: 30,
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    button: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      backgroundColor: theme.container,
      padding: 20,
      paddingHorizontal: 30,
      borderRadius: 16,
      alignItems: 'center',
    },
  });
