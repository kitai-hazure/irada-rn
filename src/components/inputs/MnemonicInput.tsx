import {
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';

type MnemonicInputProps = {
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
};

export const MnemonicInput = ({values, setValues}: MnemonicInputProps) => {
  const themedStyles = useThemedStyles(styles);
  const inputRefs = React.useRef<Array<TextInput | null>>([]);

  const onChangeText = (text: string, index: number) => {
    if (text.includes(' ')) {
      inputRefs.current[index]?.setNativeProps({
        text: text.trim(),
      });
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    setValues(prev => {
      const newValues = [...prev];
      newValues[index] = text.trim();
      return newValues;
    });
  };

  const onKeyPress = ({
    nativeEvent,
    index,
  }: NativeSyntheticEvent<TextInputKeyPressEventData> & {index: number}) => {
    if (nativeEvent.key === 'Backspace' && values[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  console.log('values', values);

  return (
    <>
      <FlatList
        data={Array(12)}
        numColumns={3}
        columnWrapperStyle={themedStyles.row}
        renderItem={({index}) => (
          <TextInput
            ref={element => (inputRefs.current[index] = element)}
            style={themedStyles.box}
            onKeyPress={event => onKeyPress({...event, index})}
            onChangeText={txt => onChangeText(txt, index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      backgroundColor: theme.blue,
      borderRadius: 5,
      borderWidth: 1,
      fontSize: 16,
      padding: 10,
      width: '100%',
      height: 400,
    },
    box: {
      backgroundColor: theme.container,
      padding: 16,
      borderRadius: 16,
      width: Dimensions.get('window').width / 3.5,
      textAlign: 'center',
      color: theme.text,
      fontWeight: '500',
      marginVertical: 8,
    },
    row: {
      flex: 1,
      justifyContent: 'space-around',
    },
  });
