import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import {Text} from 'react-native-gesture-handler';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';

interface ImageInputProps {
  onChange: () => void;
}

const ImageInput = ({onChange}: ImageInputProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}
      onPress={onChange}>
      <Ionicons
        name="camera-outline"
        size={20}
        color={colors[theme].GRAY_500}
      />
      <Text style={styles.inputText}>사진 추가</Text>
    </Pressable>
  );
};

export default ImageInput;

const styling = (theme: Theme) =>
  StyleSheet.create({
    imageInput: {
      borderWidth: 1.5,
      height: 70,
      width: 70,
      borderStyle: 'dotted',
      borderColor: colors[theme].GRAY_300,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      backgroundColor: colors[theme].WHITE,
    },
    inputText: {
      fontSize: 12,
      color: colors[theme].GRAY_500,
    },
    imageInputPressed: {
      opacity: 0.5,
    },
  });
