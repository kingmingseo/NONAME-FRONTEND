import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CalendarScreen from '@/screens/calendar/CalendarScreen';
import {MapStack} from './MapNavigation';
import {FeedStack} from './FeedNavigation';
import DrawerButton from '@/components/common/DrawerButton';
import {colors} from '@/constants/colors';
import CustomDrawerContent from '@/components/common/CustomDrawerContent';
import {MainDrawerParamList} from '@/types/navigation';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {SettingStack} from './SettingNavigation';
import useThemeStorage from '@/hooks/useThemeStorage';

type DrawerIconName = 'map' | 'book' | 'calendar';

function DrawerIcons(
  routeName: keyof MainDrawerParamList,
  focused: boolean,
  theme: 'light' | 'dark',
) {
  let iconName: DrawerIconName = 'map';

  switch (routeName) {
    case 'Map':
      iconName = 'map';
      break;
    case 'Feed':
      iconName = 'book';
      break;
    case 'Calendar':
      iconName = 'calendar';
      break;
  }

  return (
    <FontAwesome6
      name={iconName}
      size={20}
      iconStyle="solid"
      color={focused ? colors[theme].WHITE : colors[theme].GRAY_300}
    />
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  const {theme} = useThemeStorage();

  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        drawerStyle: {
          width: '60%',
          backgroundColor: colors[theme].WHITE,
        },
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerItemStyle: {
          borderRadius: 5,
        },
        drawerIcon: ({focused}) =>
          DrawerIcons(route.name as keyof MainDrawerParamList, focused, theme),
        drawerType: 'front',
        drawerActiveTintColor: colors[theme].WHITE,
        drawerActiveBackgroundColor: colors[theme].PINK_700,
        drawerInactiveTintColor: colors[theme].GRAY_500,
        drawerInactiveBackgroundColor: colors[theme].GRAY_100,
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
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Map"
        children={() => <MapStack />}
        options={{
          title: '홈',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Feed"
        children={() => <FeedStack />}
        options={{
          title: '피드',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: '캘린더',
          headerLeft: () => <DrawerButton />,
        }}
      />
      <Drawer.Screen
        name="Setting"
        children={() => <SettingStack />}
        options={{
          title: '설정',
          headerShown: false,
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
