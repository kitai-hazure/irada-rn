import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import Constants from 'expo-constants';

type DrawerLayoutProps = {
  children: React.ReactNode;
  isPadded?: boolean;
};

export const DrawerLayout = ({
  children,
  isPadded = true,
}: DrawerLayoutProps) => {
  const progress = useDrawerProgress();
  const themedStyles = useThemedStyles(styles);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: interpolate(progress.value, [0, 1], [1, 0.8], 'clamp')},
      {
        rotateY: `${interpolate(
          progress.value,
          [0, 1],
          [0, -Math.PI / 12],
          'clamp',
        )}rad`,
      },
    ],
    borderRadius: interpolate(progress.value, [0, 1], [0, 32], 'clamp'),
    overflow: 'hidden',
  }));

  return (
    <Animated.View
      style={[
        themedStyles.container,
        animatedStyle,
        isPadded ? themedStyles.paddings : null,
      ]}>
      {children}
    </Animated.View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    paddings: {
      paddingTop: (Constants.currentHeight ?? 16) + 16,
      paddingHorizontal: 16,
    },
  });
