import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';

type EmptyProps = {
  message?: string;
};

export const Empty = ({message}: EmptyProps) => {
  const themedStyles = useThemedStyles(styles);

  return (
    <View style={themedStyles.container}>
      <LottieView
        source={require('../../../assets/animations/empty.json')}
        autoPlay
        loop={false}
        style={themedStyles.loader}
      />
      <Text style={themedStyles.text}>{message ?? 'No data found'}</Text>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    loader: {
      width: 200,
      height: 200,
      alignSelf: 'center',
    },
    container: {
      flex: 0.75,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.lightText,
    },
  });
