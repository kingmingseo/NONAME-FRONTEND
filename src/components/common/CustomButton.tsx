import {
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';

interface CustomButtonProps extends PressableProps {
  label: string | React.ReactNode;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'small';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  style = null,
  textStyle = null,
  ...props
}: CustomButtonProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        style,
      ]}
      {...props}>
      {typeof label === 'string' ? (
        <Text style={[styles[`${variant}Text`], textStyle]}>{label} </Text>
      ) : (
        label
      )}
    </Pressable>
  );
};

export default CustomButton;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filled: {
      backgroundColor: colors[theme].PINK_700,
    },
    outlined: {
      backgroundColor: colors[theme].WHITE,
      borderWidth: 1,
      borderColor: colors[theme].PINK_700,
    },
    filledText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors[theme].WHITE,
    },
    outlinedText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors[theme].PINK_700,
    },
    large: {
      width: '100%',
      height: 45,
    },
    small: {
      paddingHorizontal: 10,
      height: 35,
    },
    pressed: {
      opacity: 0.8,
    },
  });
