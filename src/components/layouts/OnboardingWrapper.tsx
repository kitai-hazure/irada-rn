import {StatusBar, StyleSheet, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';

export const OnboardingWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const themedStyles = useThemedStyles(styles);

  return <View style={themedStyles.container}>{children}</View>;
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
      paddingTop: (StatusBar.currentHeight ?? 16) + 16,
    },
  });
