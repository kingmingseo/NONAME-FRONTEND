import {Pressable, StyleSheet} from 'react-native';
import React, {ComponentProps} from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';

type SolidIconName = Extract<
  ComponentProps<typeof FontAwesome6>,
  {iconStyle: 'solid'}
>['name'];

interface MapIconButtonProps {
  name: SolidIconName;
  onPress: () => void;
}

const MapIconButton = ({name, onPress}: MapIconButtonProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return (
    <Pressable style={styles.mapButton} onPress={onPress}>
      <FontAwesome6
        iconStyle="solid"
        size={25}
        color={colors[theme].WHITE}
        name={name}
      />
    </Pressable>
  );
};

export default MapIconButton;

const styling = (theme: Theme) =>
  StyleSheet.create({
    mapButton: {
      backgroundColor: colors[theme].PINK_700,
      marginVertical: 5,
      height: 45,
      width: 45,
      borderRadius: 45,
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '1px 1px 3px rbga(0,0,0,0.5)',
    },
  });
