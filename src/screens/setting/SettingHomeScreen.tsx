import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import SettingItem from '@/components/setting/SettingItem';
import {colors} from '@/constants/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SettingStackParamList} from '@/types/navigation';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import DarkModeActionSheet from '@/components/setting/DarkModeActionSheet';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

type Navigation = NavigationProp<SettingStackParamList>;

const SettingHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const {logoutMutation} = useAuth();
  const darkModeAction = useModal();
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem
          title="프로필 수정"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingItem title="다크모드" onPress={darkModeAction.show} />
        <SettingItem
          title="로그아웃"
          color={colors[theme].RED_500}
          onPress={() => logoutMutation.mutate(null)}
        />

        <DarkModeActionSheet
          isVisible={darkModeAction.isVisible}
          hideAction={darkModeAction.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingHomeScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    space: {
      height: 30,
    },
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
  });
