import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';
import {isSameAsCurrentDate, MonthYear} from '@/utils/date';
import DayOfWeeks from './DayOfWeeks';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

import DateBox from './DateBox';
import {FlatList} from 'react-native-gesture-handler';
import {ResponseCalendarPosts} from '@/api/post';
import YearSelector from './YearSelector';
import useModal from '@/hooks/useModal';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
  selectedDate: number;
  onPressDate: (date: number) => void;
  schedules: ResponseCalendarPosts;
}

const Calendar = ({
  monthYear,
  onChangeMonth,
  selectedDate,
  onPressDate,
  schedules,
}: CalendarProps) => {
  const {month, year, firstDayOfWeek, lastDate} = monthYear;
  const yearSelector = useModal();
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(-1)}>
          <Ionicons name="arrow-back" size={25} color={colors[theme].BLACK} />
        </Pressable>
        <Pressable style={styles.monthYearContainer} onPress={yearSelector.show}>
          <Text style={styles.monthYearText}>{`${year}년 ${month}월`}</Text>
          <Ionicons name="chevron-down" size={16} color={colors[theme].GRAY_400} style={styles.monthYearIcon} />
        </Pressable>
        <Pressable style={styles.monthButton} onPress={() => onChangeMonth(1)}>
          <Ionicons name="arrow-forward" size={25} color={colors[theme].BLACK} />
        </Pressable>
      </View>
      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDayOfWeek}, (_, index) => ({
            id: index,
            date: index - firstDayOfWeek + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
              hasSchedule={Boolean(schedules[item.date])}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>

      <YearSelector
        isVisible={yearSelector.isVisible}
        currentYear={year}
        hide={yearSelector.hide}
        onChangeYear={handleChangeYear}
      />
    </>
  );
};

export default Calendar;

const styling = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 25,
      marginVertical: 0,
      marginBottom: 15,
    },
    monthYearContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    monthButton: {
      padding: 10,
    },
    monthYearText: {
      fontSize: 18,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
    monthYearIcon: {
      marginLeft: 6,
    },
    bodyContainer: {
      backgroundColor: colors[theme].GRAY_100,
      borderBottomColor: colors[theme].GRAY_300,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
