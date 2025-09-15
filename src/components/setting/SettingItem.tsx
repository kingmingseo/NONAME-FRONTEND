import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

interface SettingItemProps extends PressableProps {
  title: string;
  color?: string;
}

const SettingItem = ({title, color, ...props}: SettingItemProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}>
      <Text style={[styles.titleText, {color: color ?? colors[theme].BLACK}]}>{title}</Text>
    </Pressable>
  );
};

export default SettingItem;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      gap: 10,
      borderColor: colors[theme].GRAY_200,
      backgroundColor: colors[theme].WHITE,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    pressedContainer: {
      backgroundColor: colors[theme].GRAY_100,
    },
    titleText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
  });
