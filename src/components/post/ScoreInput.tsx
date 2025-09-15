import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import Slider from '@react-native-community/slider';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

interface ScoreInputProps {
  score: number;
  onChangeScore: (value: number) => void;
}

const ScoreInput = ({score, onChangeScore}: ScoreInputProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>평점</Text>
        <Text style={styles.labelText}>{score}점</Text>
      </View>
      <Slider
        value={score}
        onValueChange={onChangeScore}
        step={1}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor={colors[theme].PINK_700}
        maximumTrackTintColor={colors[theme].GRAY_300}
        thumbTintColor={colors[theme].GRAY_300}
      />
    </View>
  );
};

export default ScoreInput;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 5,
      padding: 15,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      backgroundColor: colors[theme].WHITE,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    labelText: {
      color: colors[theme].GRAY_700,
    },
  });
