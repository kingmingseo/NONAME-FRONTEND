import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedListScreen from '@/screens/feed/FeedListScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import EditLocationScreen from '@/screens/feed/EditLocationScreen';
import {colors} from '@/constants/colors';
import DrawerButton from '@/components/common/DrawerButton';
import ImageZoomScreen from '@/screens/feed/ImageZoomScreen';
import {Pressable} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import useThemeStorage from '@/hooks/useThemeStorage';

const Stack = createStackNavigator();

export function FeedStack() {
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
        name="FeedList" 
        component={FeedListScreen}
        options={({navigation}) => ({
          title: '피드',
          headerLeft: () => <DrawerButton />,
          headerRight: () => (
            <Pressable
              style={{paddingHorizontal: 12}}
              onPress={() => navigation.navigate('FeedFavorite')}>
              <Ionicons name="star" size={25} color={colors[theme].PINK_700} />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen 
        name="FeedDetail" 
        component={FeedDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="FeedFavorite" 
        component={FeedFavoriteScreen}
        options={({navigation}) => ({
          title: '즐겨찾기',
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={30}
              color={colors[theme].BLACK}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen 
        name="EditLocation" 
        component={EditLocationScreen}
        options={{ title: '장소 수정' }}
      />
      <Stack.Screen 
        name="ImageZoom" 
        component={ImageZoomScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
