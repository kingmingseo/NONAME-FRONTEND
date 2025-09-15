import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

const DayOfWeeks = () => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <View style={styles.container}>
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, index) => {
        return (
          <View key={index} style={styles.item}>
            <Text
              style={[
                styles.text,
                dayOfWeek === '토' && styles.saturday,
                dayOfWeek === '일' && styles.sunday,
              ]}>
              {dayOfWeek}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default DayOfWeeks;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    item: {
      width: Dimensions.get('window').width / 7,
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      color: colors[theme].BLACK,
    },
    saturday: {
      color: colors[theme].RED_500,
    },
    sunday: {
      color: colors[theme].BLUE_500,
    },
  });
