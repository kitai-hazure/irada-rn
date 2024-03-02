import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Theme} from '../config';
import {useThemedStyles} from '../hooks';
import {MnemonicInput} from '../components';

export const Mnemonic = () => {
  const themedStyles = useThemedStyles(styles);
  const [values, setValues] = useState(Array(12).fill(''));

  return (
    <View style={themedStyles.container}>
      <MnemonicInput values={values} setValues={setValues} />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
      backgroundColor: theme.background,
    },
  });
