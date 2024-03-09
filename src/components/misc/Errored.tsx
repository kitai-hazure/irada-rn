import {StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export const Errored = () => {
  return (
    <LottieView
      source={require('../../../assets/animations/error.json')}
      autoPlay
      loop
      style={styles.loader}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    flex: 0.75,
  },
});
