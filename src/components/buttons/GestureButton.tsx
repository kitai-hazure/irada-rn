import React from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

type GestureButtonProps = {
  children: React.ReactNode;
  scale?: number;
  impactStyle?: Haptics.ImpactFeedbackStyle;
};

export const GestureButton = ({
  children,
  scale = 1.2,
  impactStyle = Haptics.ImpactFeedbackStyle.Light,
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
    transform: [{scale: withTiming(pressed.value ? scale : 1)}],
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={animatedStyles}>{children}</Animated.View>
    </GestureDetector>
  );
};
