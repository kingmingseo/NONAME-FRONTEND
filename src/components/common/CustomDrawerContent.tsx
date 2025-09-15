import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {colors} from '@/constants/colors';
import {Text} from 'react-native-gesture-handler';
import useAuth from '@/hooks/queries/useAuth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {getBaseURL} from '@/api/axios';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {auth} = useAuth();
  const navigation = useNavigation();
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <Pressable style={styles.profileContainer}>
          <View style={styles.userImageContainer}>
            <Image
              source={
                auth.imageUri
                  ? {uri: getBaseURL() + `/${auth.imageUri}`}
                  : require('@/assets/default-user.png')
              }
              style={styles.userImage}
            />
          </View>
          <Text style={styles.nickname}>{auth.nickname}</Text>
        </Pressable>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.bottomMenu}
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <Ionicons name="settings-outline" size={20} color={colors[theme].BLACK} />
          <Text style={styles.menuText}>설정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 20,
      borderTopColor: colors[theme].GRAY_200,
      borderTopWidth: 1,
    },
    menuText: {
      fontSize: 15,
      color: colors[theme].BLACK,
    },
    userImageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    userImage: {
      width: `100%`,
      height: `100%`,
      borderRadius: 35,
    },
    nickname: {
      fontSize: 14,
      color: colors[theme].BLACK,
    },
    profileContainer: {
      alignItems: `center`,
      marginBottom: 30,
      gap: 5,
    },
    contentContainer: {
      gap: 5,
      marginTop: 30,
    },
    bottomMenu: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
  });
