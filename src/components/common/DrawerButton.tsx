import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/types/navigation';

import {colors} from '@/constants/colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import useThemeStorage from '@/hooks/useThemeStorage';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

interface DrawerButtonProps {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const DrawerButton = ({color, style}: DrawerButtonProps) => {
  const navigation = useNavigation<Navigation>();
  const {theme} = useThemeStorage();
  
  const defaultColor = color || colors[theme].BLACK;

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.openDrawer()}>
      <FontAwesome6 name="bars" size={20} iconStyle="solid" color={defaultColor} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});
export default DrawerButton;
