import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Theme} from '../../config';
import {useThemedStyles} from '../../hooks';
import {GestureButton} from '../buttons';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigatorRoutes} from '../../../types/navigation';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons';

type HeaderProps = {
  title: string;
  Icon?: React.JSX.Element;
};

export const Header = ({title, Icon}: HeaderProps) => {
  const themedStyles = useThemedStyles(styles);
  const navigation =
    useNavigation<DrawerNavigationProp<DrawerNavigatorRoutes, 'Home'>>();

  return (
    <GestureButton>
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={themedStyles.back}>
        {Icon ?? (
          <Ionicons
            name="caret-back-outline"
            size={22}
            color={themedStyles.theme.text}
          />
        )}
        <Text style={themedStyles.title}>{title}</Text>
      </Pressable>
    </GestureButton>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginVertical: 16,
    },
    back: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  });
