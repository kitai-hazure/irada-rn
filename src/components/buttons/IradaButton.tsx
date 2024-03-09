import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';

type IradaButtonProps = {
  color: keyof Theme;
  textColor?: keyof Theme;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & PressableProps;

export const IradaButton = ({
  color,
  textColor,
  textStyle,
  style,
  children,
  ...rest
}: IradaButtonProps) => {
  const themedStyles = useThemedStyles(styles);

  return (
    <Pressable
      {...rest}
      style={[
        {backgroundColor: themedStyles.theme[color]},
        themedStyles.container,
        style,
      ]}>
      {typeof children === 'string' ? (
        <Text
          style={[
            themedStyles.text,
            {color: themedStyles.theme[textColor || 'white']},
            textStyle,
          ]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme.text,
      fontSize: 14,
      alignSelf: 'center',
      justifyContent: 'center',
    },
  });
