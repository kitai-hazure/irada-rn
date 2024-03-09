import React from 'react';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useThemedStyles} from '../../hooks';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Pressable, StyleSheet} from 'react-native';
import {Theme} from '../../config';
import {BlurView} from '@react-native-community/blur';

const OVERDRAG = 20;

type BottomSheetProps = {
  height: number;
  isOpen: boolean;
  closeSheet: () => void;
  children: React.ReactNode;
};

export const BottomSheet = ({
  isOpen,
  closeSheet,
  height,
  children,
}: BottomSheetProps) => {
  const themedStyles = useThemedStyles(styles);
  const yOffset = useSharedValue(0);

  const close = () => {
    closeSheet();
    yOffset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange(({changeY}) => {
      const offset = yOffset.value + changeY;
      const clamp = Math.max(offset, -OVERDRAG);
      yOffset.value = offset > 0 ? offset : withSpring(clamp);
    })
    .onFinalize(() => {
      if (yOffset.value < height / 3) {
        yOffset.value = withSpring(0);
      } else {
        yOffset.value = withTiming(height, {}, () => {
          runOnJS(close)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{translateY: yOffset.value}],
  }));

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={themedStyles.backdrop}>
        <BlurView
          style={themedStyles.backdrop}
          blurType={themedStyles.theme.blurType}
          blurAmount={8}
        />
        <Pressable style={themedStyles.backdrop} onPress={close} />
      </Animated.View>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[themedStyles.sheet, {maxHeight: height}, translateY]}
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}>
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1,
    },
    sheet: {
      backgroundColor: theme.background,
      padding: 16,
      position: 'absolute',
      bottom: -OVERDRAG * 1.1,
      left: 0,
      right: 0,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      zIndex: 2,
    },
  });
