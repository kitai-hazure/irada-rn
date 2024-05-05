import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {OnboardingData} from '../../screens';
import {useThemedStyles} from '../../hooks';
import Lottie from 'lottie-react-native';

type OnboardingSlideProps = {
  index: number;
  scrollX: SharedValue<number>;
  item: OnboardingData;
};

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const OnboardingSlide = ({
  scrollX,
  index,
  item,
}: OnboardingSlideProps) => {
  const themedStyles = useThemedStyles(styles);

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [1, 8, 8],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{scale: scale}],
    };
  });

  return (
    <View style={[themedStyles.itemContainer]}>
      <View style={themedStyles.circleContainer}>
        <Animated.View
          style={[
            {
              width: width,
              height: width,
              borderRadius: width / 2,
              backgroundColor: item.bg,
            },
            circleAnimation,
          ]}
        />
      </View>
      <Lottie
        source={item.animation}
        style={{
          width: width * 0.9,
          height: width * 0.9,
        }}
        autoPlay
        loop
      />
      <Text style={themedStyles.itemText}>{item.title}</Text>
      <Text style={themedStyles.itemDescription}>{item.description}</Text>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    itemContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop: height / 7,
      alignItems: 'center',
      width: width,
    },
    circleContainer: {
      position: 'absolute',
      right: 0,
      bottom: -width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginHorizontal: 20,
      color: theme.text,
    },
    itemDescription: {
      fontSize: 18,
      textAlign: 'center',
      marginHorizontal: 20,
      color: theme.text,
      marginTop: 20,
    },
  });
