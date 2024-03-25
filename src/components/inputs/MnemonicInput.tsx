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
import {ToastHelper} from '../../helpers';

type MnemonicInputProps = {
  values?: string[];
  setValues?: React.Dispatch<React.SetStateAction<string[]>>;
  editable?: boolean;
};

export const MnemonicInput = ({
  values,
  setValues,
  editable = true,
}: MnemonicInputProps) => {
  const themedStyles = useThemedStyles(styles);
  const inputRefs = React.useRef<Array<TextInput | null>>([]);

  if (!values) {
    return null;
  }

  const onChangeText = (text: string, index: number) => {
    // if the user types a space, move to the next input
    if (text.includes(' ')) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    // only allow lowercase letters
    if (!/^[a-z]*$/.test(text)) {
      ToastHelper.show({
        type: 'error',
        autoHide: true,
        text1: 'Invalid character',
        text2: 'Only lowercase letters are allowed',
      });
      return;
    }
    setValues?.(prev => {
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

  return (
    <FlatList
      data={Array(12)}
      style={themedStyles.flatlist}
      numColumns={3}
      columnWrapperStyle={themedStyles.row}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      renderItem={({index}) => (
        <TextInput
          editable={editable}
          value={values[index]}
          ref={element => (inputRefs.current[index] = element)}
          style={themedStyles.box}
          onKeyPress={event => onKeyPress({...event, index})}
          onChangeText={txt => onChangeText(txt, index)}
          keyboardType="default"
          autoCapitalize="none"
        />
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      borderRadius: 5,
      borderWidth: 1,
      fontSize: 16,
      padding: 8,
      width: '100%',
      height: 400,
    },
    box: {
      backgroundColor: theme.container,
      padding: 16,
      borderRadius: 16,
      width: Math.min(Dimensions.get('window').width / 3.5, 150),
      textAlign: 'center',
      color: theme.text,
      fontWeight: '500',
      marginVertical: 8,
    },
    row: {
      flex: 1,
      justifyContent: 'space-around',
    },
    flatlist: {
      flexGrow: 0,
    },
  });
