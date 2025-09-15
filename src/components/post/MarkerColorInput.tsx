import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import {ScrollView} from 'react-native-gesture-handler';
import CustomMarker from '@/components/common/CustomMarker';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

interface MarkerColorInputProps {
  color: string;
  score: number;
  onChangeColor: (valje: string) => void;
}

const MarkerColorInput = ({
  color,
  score,
  onChangeColor,
}: MarkerColorInputProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <View style={styles.container}>
      <Text style={styles.markerlabel}>마커선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {[
            colors[theme].PINK_400,
            colors[theme].BLUE_400,
            colors[theme].YELLOW_400,
            colors[theme].GREEN_400,
            colors[theme].PURPLE_400,
          ].map(selsectColor => (
            <Pressable
              style={[
                styles.markerBox,
                color === selsectColor && styles.pressedMarker,
              ]}
              key={selsectColor}
              onPress={() => onChangeColor(selsectColor)}>
              <CustomMarker color={selsectColor} score={score} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MarkerColorInput;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_200,
      padding: 15,
      backgroundColor: colors[theme].WHITE,
    },
    markerlabel: {
      marginBottom: 15,
      color: colors[theme].GRAY_700,
    },
    markerInputScroll: {
      flexDirection: 'row',
      gap: 20,
    },
    markerBox: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 6,
      backgroundColor: colors[theme].GRAY_100,
    },
    pressedMarker: {
      borderWidth: 2,
      borderColor: colors[theme].RED_500,
    },
  });
