import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

interface ScheduleProps {
  title: string;
  subTitle: string;
  onPress: () => void;
}

const Schedule = ({title, subTitle, onPress}: ScheduleProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.line} />
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subTitle}>
          {subTitle}
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Schedule;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    line: {
      backgroundColor: colors[theme].PINK_700,
      width: 6,
      height: 50,
      marginRight: 8,
      borderRadius: 20,
    },
    infoContainer: {
      justifyContent: 'space-evenly',
    },
    subTitle: {
      color: colors[theme].GRAY_500,
      fontSize: 13,
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      color: colors[theme].BLACK,
    },
  });
