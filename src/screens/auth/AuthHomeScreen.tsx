import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@/types/navigation';
import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Theme } from '@/store/theme';

type Navigation = StackNavigationProp<AuthStackParamList>;

const AuthHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/MATZIP.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style = {styles.kakaoButtonContainer}
          label="카카오 로그인"
          textStyle={styles.kakaoButtonText}
          onPress={() => navigation.navigate('KakaoLogin')}
        />
        <CustomButton
          label="이메일 로그인"
          onPress={() => navigation.navigate('Login')}
        />
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AuthHomeScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    imageContainer: {
      flex: 2,
      alignItems: 'center',
    },
    buttonContainer: {
      flex: 1,
      paddingHorizontal: 30,
      gap: 5,
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: '100%',
    },
    emailText: {
      textDecorationLine: 'underline',
      fontWeight: 500,
      padding: 10,
      color: colors[theme].BLACK,
    },
    kakaoButtonContainer: {
      backgroundColor: '#fee503'
    },
    kakaoButtonText: {
      color: '#181600',
    },
  });
