import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from '../screens/Notification';
import {
  ACCOUNT,
  HISTORY,
  HOME_NAVIGATOR,
  NOTIFICATION,
  ROOM_LIST,
} from '../constants/routeNames';
import HomeNavigator from './HomeNavigator';
import TabBottomMenu from './TabBottomMenu';
import RoomIcon from '../assets/icons/room.svg';
import RoomOutLineIcon from '../assets/icons/room_outline.svg';
import HistoryIcon from '../assets/icons/history.svg';
import HistoryOutLineIcon from '../assets/icons/history_outline.svg';
import HistoryTabNavigator from './HistoryTabNavigation';
import ProfileNavigator from './ProfileTabNavigator';
import ProfileIcon from '../assets/icons/account.svg';
import ProfileOutLineIcon from '../assets/icons/account_outline.svg';

const Tab = createBottomTabNavigator();

const BottomTabNavigatior = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          alignItems: 'center',
        },
        tabBarIcon: ({focused}) => {
          const WIDTH = 25,
            HEIGHT = 25;
          if (route.name === ROOM_LIST) {
            return focused ? (
              <TabBottomMenu
                svgIcon={<RoomIcon width={WIDTH} height={HEIGHT} />}
                isFocused={focused}
                nameIcon={ROOM_LIST}
              />
            ) : (
              <TabBottomMenu
                svgIcon={<RoomOutLineIcon width={WIDTH} height={HEIGHT} />}
                nameIcon={ROOM_LIST}
              />
            );
          } else if (route.name === HISTORY) {
            return focused ? (
              <TabBottomMenu
                svgIcon={<HistoryIcon width={WIDTH} height={HEIGHT} />}
                isFocused={focused}
                nameIcon={HISTORY}
              />
            ) : (
              <TabBottomMenu
                svgIcon={<HistoryOutLineIcon width={WIDTH} height={HEIGHT} />}
                nameIcon={HISTORY}
              />
            );
          } else if (route.name === ACCOUNT) {
            return focused ? (
              <TabBottomMenu
                svgIcon={<ProfileIcon width={WIDTH} height={HEIGHT} />}
                isFocused={focused}
                nameIcon={ACCOUNT}
              />
            ) : (
              <TabBottomMenu
                svgIcon={<ProfileOutLineIcon width={WIDTH} height={HEIGHT} />}
                nameIcon={ACCOUNT}
              />
            );
          }
        },
      })}>
      <Tab.Screen
        name={ROOM_LIST}
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={HISTORY}
        options={{headerShown: false}}
        component={HistoryTabNavigator}
      />
      <Tab.Screen
        name={ACCOUNT}
        options={{headerShown: false}}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatior;
