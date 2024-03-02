import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import {runOnJS} from 'react-native-reanimated';

type HapticButtonProps = {
  children: React.ReactNode;
  hapticStyle?: Haptics.ImpactFeedbackStyle;
};

export const HapticButton = ({
  children,
  hapticStyle = Haptics.ImpactFeedbackStyle.Light,
}: HapticButtonProps) => {
  const hapticImpact = () => {
    Haptics.impactAsync(hapticStyle);
  };

  const tap = Gesture.Tap().onBegin(() => {
    runOnJS(hapticImpact)();
  });

  return <GestureDetector gesture={tap}>{children}</GestureDetector>;
};
