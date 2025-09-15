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

function generateYears(baseYear: number, before: number) {
  const startYear = baseYear - before;
  const totalYears = before + 1;
  return Array.from({length: totalYears}, (_, index) => startYear + index);
}

const YearSelector = ({
  isVisible,
  currentYear,
  hide,
  onChangeYear,
}: YearSelectorProps) => {
  const years = useMemo(() => generateYears(currentYear, 10), [currentYear]);

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
            initialScrollIndex={Math.max(
              years.findIndex(y => y === currentYear),
              0,
            )}
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
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

const ITEM_HEIGHT = 50;
