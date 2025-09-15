import {Pressable, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import Calendar from '@/components/calendar/Calendar';
import {getMonthYearDetails, getNewMonthYear} from '@/utils/date';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, Text} from 'react-native-gesture-handler';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import Schedule from '@/components/calendar/Schedule';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';

const CalendarScreen = () => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const navigation = useNavigation();
  const {data: posts} = useGetCalendarPosts(monthYear.year, monthYear.month);
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  const moveToToday = useCallback(() => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  }, []);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
    setSelectedDate(0); // 월이 바뀔 때 선택된 날짜 초기화
  };

  const renderHeaderRight = useCallback(
    () => (
      <Pressable onPress={moveToToday} style={{paddingHorizontal: 10}}>
        <Text style={{color: colors[theme].PINK_700, fontWeight: 'bold'}}>
          Today
        </Text>
      </Pressable>
    ),
    [moveToToday, theme],
  );

  const handlePressSchedule = (postId: number) => {
    navigation.navigate('Feed', {
      screen: 'FeedDetail',
      params: {id: postId},
      initial: false,
    });
  };
  console.log(posts);
  useEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts ?? {}}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={(date: number) => setSelectedDate(date)}
      />
      <ScrollView
        style={styles.scheduleContainer}
        contentContainerStyle={{gap: 20}}>
        {posts?.[selectedDate]?.map(post => (
          <Schedule
            key={post.id}
            subTitle={post.address}
            title={post.title}
            onPress={() => handlePressSchedule(post.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    scheduleContainer: {
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
  });
