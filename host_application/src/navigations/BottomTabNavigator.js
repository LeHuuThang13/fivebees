import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from '../screens/Notification';
import {HOME_NAVIGATOR, NOTIFICATION, ROOM_LIST} from '../constants/routeNames';
import HomeNavigator from './HomeNavigator';
import TabBottomMenu from './TabBottomMenu';
import RoomIcon from '../assets/icons/room.svg';
import RoomOutLineIcon from '../assets/icons/room_outline.svg';
import BellIcon from '../assets/icons/bell.svg';
import BellOutLineIcon from '../assets/icons/bell_outline.svg';
import NotifNavigator from './NotificationNavigator';

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
          } else if (route.name === NOTIFICATION) {
            return focused ? (
              <TabBottomMenu
                svgIcon={<BellIcon width={WIDTH} height={HEIGHT} />}
                isFocused={focused}
                nameIcon={NOTIFICATION}
              />
            ) : (
              <TabBottomMenu
                svgIcon={<BellOutLineIcon width={WIDTH} height={HEIGHT} />}
                nameIcon={NOTIFICATION}
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
        name={NOTIFICATION}
        options={{headerShown: false}}
        component={NotifNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatior;
