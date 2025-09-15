import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {colors} from '@/constants/colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';

interface SearchInputProps extends TextInputProps {
  onSubmit: () => void;
}

const SearchInput = ({onSubmit, ...props}: SearchInputProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors[theme].GRAY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        {...props}
      />
      <FontAwesome6
        name="magnifying-glass"
        iconStyle="solid"
        size={20}
        color={colors[theme].BLACK}
        onPress={onSubmit}
      />
    </View>
  );
};

export default SearchInput;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderColor: colors[theme].GRAY_200,
      padding: 10,
      borderRadius: 5,
      backgroundColor: colors[theme].WHITE,
    },
    input: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 0,
      paddingLeft: 0,
      color: colors[theme].BLACK,
    },
  });
