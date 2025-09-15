import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ActionSheet} from '@/components/common/ActionSheet';
import {FlatList} from 'react-native-gesture-handler';

interface YearSelectorProps {
  isVisible: boolean;
  currentYear: number;
  hide: () => void;
  onChangeYear: (selectYear: number) => void;
}

function generateYears(baseYear: number, count: number) {
  return Array.from({length: count}, (_, index) => baseYear - index);
}

const YearSelector = ({
  isVisible,
  currentYear,
  hide,
  onChangeYear,
}: YearSelectorProps) => {
  // 현재 시스템 연도 기준으로 현재 포함 과거 4년까지 총 5개만 노출
  const years = useMemo(() => generateYears(new Date().getFullYear(), 5), []);

  return (
    <ActionSheet isVisible={isVisible} animationType="fade" hideAction={hide}>
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Title>연도 선택</ActionSheet.Title>
          <ActionSheet.Divider />
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={years}
            keyExtractor={item => String(item)}
            initialNumToRender={years.length}
            removeClippedSubviews={false}
            renderItem={({item}) => (
              <ActionSheet.Button
                isChecked={item === currentYear}
                onPress={() => onChangeYear(item)}>
                {`${item}년`}
              </ActionSheet.Button>
            )}
          />
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
};

export default YearSelector;

const styles = StyleSheet.create({
  list: {
    maxHeight: 360,
  },
  listContent: {
    paddingBottom: 10,
  },
});
