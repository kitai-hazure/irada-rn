import React, {FunctionComponent} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {useAfterInteractions} from '../../hooks';
import {Loader} from './Loader';

export function optimizeHeavyScreen<Props>(
  Component: FunctionComponent<Props>,
  Placeholder: FunctionComponent | null = null,
) {
  const OptimizedHeavyScreen = (props: Props) => {
    const {areInteractionsComplete} = useAfterInteractions();
    return (
      <>
        {areInteractionsComplete ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.container}>
            {/* @ts-ignore */}
            <Component {...props} />
          </Animated.View>
        ) : Placeholder ? (
          <Animated.View exiting={FadeOut} style={styles.container}>
            <Placeholder />
          </Animated.View>
        ) : (
          <Loader />
        )}
      </>
    );
  };
  return OptimizedHeavyScreen;
}

const styles = StyleSheet.create({container: {flex: 1}});
