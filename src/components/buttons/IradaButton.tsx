import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';

type IradaButtonProps = {
  color: keyof Theme;
  textColor?: keyof Theme;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  loading?: boolean;
  loaderColor?: keyof Theme;
} & PressableProps;

export const IradaButton = ({
  color,
  textColor = 'white',
  textStyle,
  style,
  children,
  loading = false,
  loaderColor = 'white',
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
      {loading ? (
        <ActivityIndicator color={themedStyles.theme[loaderColor]} />
      ) : (
        <>
          {typeof children === 'string' ? (
            <Text
              style={[
                themedStyles.text,
                {color: themedStyles.theme[textColor]},
                textStyle,
              ]}>
              {children}
            </Text>
          ) : (
            <View style={themedStyles.childrenContainer}>{children}</View>
          )}
        </>
      )}
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 16,
    },
    text: {
      color: theme.text,
      fontSize: 14,
      textAlign: 'center',
    },
    childrenContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
  });
