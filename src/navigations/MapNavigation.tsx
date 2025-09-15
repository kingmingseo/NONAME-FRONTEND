import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddLocationScreen from '@/screens/map/AddLocationScreen';
import SearchLocationScreen from '@/screens/map/SearchLocationScreen';
import {colors} from '@/constants/colors';
import useThemeStorage from '@/hooks/useThemeStorage';

const Stack = createStackNavigator();

export function MapStack() {
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
      }}>
      <Stack.Screen 
        name="MapHome" 
        component={MapHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddLocation" 
        component={AddLocationScreen}
        options={{
          title: '장소 추가',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
      <Stack.Screen 
        name="SearchLocation" 
        component={SearchLocationScreen}
        options={{
          presentation: 'modal',
          title: '장소 검색',
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
}
