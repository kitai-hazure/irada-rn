import React from 'react';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import {ViewProps} from 'react-native';

type GestureButtonProps = {
  children: React.ReactNode;
  scale?: number;
  impactStyle?: Haptics.ImpactFeedbackStyle;
} & ViewProps;

const GestureButtonComponent = ({
  children,
  scale = 1.05,
  impactStyle = Haptics.ImpactFeedbackStyle.Light,
  style,
  ...rest
}: GestureButtonProps) => {
  const pressed = useSharedValue(false);

  const haticImpact = () => {
    Haptics.impactAsync(impactStyle);
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
      runOnJS(haticImpact)();
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(pressed.value ? scale : 1, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      },
    ],
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[animatedStyles, style]} {...rest}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export const GestureButton = React.memo(GestureButtonComponent);
