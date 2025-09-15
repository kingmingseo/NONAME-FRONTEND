import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';
import {colors} from '@/constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

const FixedBottomCTA = ({label, onPress}: FixedBottomCTAProps) => {
  const inset = useSafeAreaInsets();
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return (
    <View style={[styles.fixed, {paddingBottom: inset.bottom || 12}]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
};

export default FixedBottomCTA;

const styling = (theme: Theme) =>
  StyleSheet.create({
    fixed: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      paddingTop: 12,
      paddingHorizontal: 16,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors[theme].GRAY_300,
      backgroundColor: colors[theme].WHITE,
    },
  });
