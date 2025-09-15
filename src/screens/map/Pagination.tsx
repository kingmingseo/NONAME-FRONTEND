import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';

interface PaginationProps {
  pageParam: number;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
  hasNextPage: boolean;
  totalLength: number;
}

const Pagination = ({
  pageParam,
  fetchNextPage,
  fetchPrevPage,
  hasNextPage,
  totalLength,
}: PaginationProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pageButton}
        onPress={fetchPrevPage}
        disabled={pageParam <= 1}>
        <Ionicons
          name="chevron-back"
          size={15}
          color={pageParam > 1 ? colors.BLACK : colors.GRAY_300}
        />
        <Text style={pageParam > 1 ? styles.pageText : styles.pageTextDisabled}>
          이전 페이지
        </Text>
      </Pressable>
      <Pressable
        style={styles.pageButton}
        onPress={fetchNextPage}
        disabled={totalLength === 0 || !hasNextPage}>
        <Text
          style={
            totalLength > 0 && hasNextPage
              ? styles.pageText
              : styles.pageTextDisabled
          }>
          다음 페이지
        </Text>
        <Ionicons
          name="chevron-forward"
          size={15}
          color={
            totalLength > 0 && hasNextPage ? colors.BLACK : colors.GRAY_300
          }
        />
      </Pressable>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 25,
  },
  pageText: {
    fontSize: 15,
    color: colors.BLACK,
  },
  pageTextDisabled: {
    fontSize: 15,
    color: colors.GRAY_300,
  },
});
