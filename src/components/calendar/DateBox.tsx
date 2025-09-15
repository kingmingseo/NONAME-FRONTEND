import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

interface DateBoxProps {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void;
  isToday: boolean;
  hasSchedule: boolean;
}

const DateBox = ({
  date,
  selectedDate,
  onPressDate,
  isToday,
  hasSchedule,
}: DateBoxProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              date === selectedDate && styles.selectedContainer,
            ]}>
            <Text
              style={[
                styles.dateText,
                date === selectedDate && styles.selectedDateText,
                isToday && styles.todayText,
              ]}>
              {date}
            </Text>
          </View>
          {hasSchedule && <View style={styles.scheduleIndicator} />}
        </>
      )}
    </Pressable>
  );
};

export default DateBox;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width / 7,
      height: Dimensions.get('window').width / 7,
      alignItems: 'center',
    },
    dateContainer: {
      marginTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 28,
    },
    dateText: {
      fontSize: 17,
      color: colors[theme].BLACK,
    },
    selectedContainer: {
      backgroundColor: colors[theme].BLACK,
      borderRadius: 28,
    },
    selectedDateText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    todayText: {
      color: colors[theme].PINK_700,
      fontWeight: 'bold',
    },
    scheduleIndicator: {
      marginTop: 2,
      width: 6,
      height: 6,
      borderRadius: 6,
      backgroundColor: colors[theme].GRAY_500,
    },
  });
