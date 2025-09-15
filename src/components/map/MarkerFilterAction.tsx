import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {ActionSheet} from '../common/ActionSheet';
import {colors} from '@/constants/colors';
import useFilterStore from '@/store/filter';
import useThemeStorage from '@/hooks/useThemeStorage';

interface MarkerFilterActionProps {
  isVisible: boolean;
  hideAction: () => void;
}

const MarkerFilterAction = ({
  isVisible,
  hideAction,
}: MarkerFilterActionProps) => {
  const [filterCondition, setFilterCondition] = useState('색상');
  const {filters, setFilters} = useFilterStore();
  const {theme} = useThemeStorage();

  const handleFilter = (name: string) => {
    setFilters({...filters, [name]: !filters[name]});
  };
  return (
    <ActionSheet
      isVisible={isVisible}
      hideAction={hideAction}
      animationType="fade">
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Title>마커 필터링</ActionSheet.Title>
          <ActionSheet.Divider />
          <View style={styles.filterContainer}>
            {['색상', '평점'].map(item => (
              <ActionSheet.Filter
                key={item}
                isSelected={filterCondition === item}
                onPress={() => setFilterCondition(item)}>
                {item}
              </ActionSheet.Filter>
            ))}
          </View>
          <ActionSheet.Divider />
          {filterCondition === '색상' && (
            <>
              {[
                colors[theme].PINK_400,
                colors[theme].YELLOW_400,
                colors[theme].GREEN_400,
                colors[theme].BLUE_400,
                colors[theme].PURPLE_400,
              ].map(color => (
                <ActionSheet.CheckBox
                  icon={
                    <View style={[styles.marker, {backgroundColor: color}]} />
                  }
                  key={color}
                  isChecked={filters[color]}
                  onPress={() => handleFilter(color)}
                />
              ))}
            </>
          )}
          {filterCondition === '평점' && (
            <>
              {['1', '2', '3', '4', '5'].map(score => (
                <ActionSheet.CheckBox
                  key={score}
                  isChecked={filters[score]}
                  onPress={() => handleFilter(score)}>
                  {score}점
                </ActionSheet.CheckBox>
              ))}
            </>
          )}
          <ActionSheet.Divider />
          <ActionSheet.Button onPress={hideAction}>완료</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
};

export default MarkerFilterAction;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});
