import React from 'react';
import SignupScreen from '@/screens/auth/SignupScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';
import KakaoLoginScreen from '@/screens/auth/KakaoLoginScreen';

const Stack = createStackNavigator();

function AuthNavigation() {
  const {theme} = useThemeStorage();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors[theme].BLACK,
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GRAY_500,
        },
        headerTitleStyle: {
          fontSize: 16,
        },
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
      }}>
      <Stack.Screen 
        name="AuthHome" 
        component={AuthHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: '로그인' }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{ title: '회원가입' }}
      />
      <Stack.Screen 
        name="KakaoLogin" 
        component={KakaoLoginScreen}
        options={{ title: '카카오로그인' }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
