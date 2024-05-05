import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {GestureButton} from './GestureButton';
import {useThemedStyles} from '../../hooks';
import {HeroButtonType} from '../../screens';

const width = Dimensions.get('screen').width;

type HeroButtonProps = {
  item: HeroButtonType;
};

const HeroButtonComponent = ({item}: HeroButtonProps) => {
  const themedStyles = useThemedStyles(styles);

  return (
    <GestureButton>
      <Pressable onPress={item.onPress}>
        <View style={themedStyles.container}>
          {item.icon}
          <Text style={themedStyles.text}>{item.title}</Text>
        </View>
      </Pressable>
    </GestureButton>
  );
};

export const HeroButton = React.memo(HeroButtonComponent);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      width: width / 4,
    },
    text: {
      color: theme.text,
      fontSize: 14,
      marginTop: 8,
      textAlign: 'center',
    },
  });
