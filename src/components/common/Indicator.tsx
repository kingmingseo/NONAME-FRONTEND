import {ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { colors } from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';

const Indicator = ({size = 'small'} : ActivityIndicatorProps) => {
  const {theme} = useThemeStorage();
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors[theme].GRAY_500} />
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
