import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RegionInfo} from '@/hooks/useSearchLocation';
import {colors} from '@/constants/colors';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from '@react-native-vector-icons/ionicons';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import useLocationStore from '@/store/location';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

interface SearchRegionResultProps {
  regionInfo: RegionInfo[];
}

const SearchRegionResult = ({regionInfo}: SearchRegionResultProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  const navigation = useNavigation();
  const {setMoveLocation, setSelectedLocation} = useLocationStore();
  const handlePressRegionInfo = (latitude: string, longitude: string) => {
    const regionLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    moveToMapScreen(regionLocation);
  };
  const moveToMapScreen = (location: LatLng) => {
    navigation.goBack();
    setMoveLocation(location);
    setSelectedLocation(location);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {regionInfo.map((info, index) => (
          <Pressable
            onPress={() => handlePressRegionInfo(info.y, info.x)}
            key={info.id}
            style={[
              styles.itemBorder,
              index === regionInfo.length - 1 && styles.noItemBorder,
            ]}>
            <View style={styles.placeNameContainer}>
              <Ionicons name="location" size={10} color={colors[theme].PINK_700} />
              <Text
                style={styles.placeText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {info.place_name}
              </Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.distanceText}>
                {(Number(info.distance) / 1000).toFixed(2)}km
              </Text>
              <Text style={styles.subInfoText}>{info.category_name}</Text>
            </View>
            <Text style={styles.subInfoText}>{info.road_address_name}</Text>
          </Pressable>
        ))}

        {regionInfo.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchRegionResult;

const styling = (theme: Theme) => StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors[theme].GRAY_200,
    borderRadius: 5,
    height: Dimensions.get('screen').height / 2,
    marginVertical: 5,
  },
  scrollContainer: {
    padding: 10,
  },
  itemBorder: {
    marginHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: colors[theme].GRAY_300,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 3,
  },
  placeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  placeText: {
    color: colors[theme].BLACK,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  distanceText: {
    color: colors[theme].BLACK,
  },
  subInfoText: {
    color: colors[theme].GRAY_500,
    flexShrink: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: colors[theme].GRAY_500,
    fontSize: 16,
  },
  noItemBorder: {
    borderBottomWidth: 0,
  },
});
