import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ACCOUNT,
  ACCOUNT_BOTTOM,
  NOTIFICATION,
  NOTIFICATION_BOTTOM,
  NOTI_BOTTOM,
  QRCODE,
  QRCODE_BOTTOM,
  ROOM_LIST,
  ROOM_LIST_BOTTOM,
} from '../constants/routeNames';
import TabBottomMenu from './TabBottomMenu';
import RoomIcon from '../assets/icons/room.svg';
import RoomOutLineIcon from '../assets/icons/room_outline.svg';
import BellIcon from '../assets/icons/bell.svg';
import BellOutLineIcon from '../assets/icons/bell_outline.svg';
import NotiTabNavigator from './NotiTabNavigator';
import ProfileNavigator from './ProfileTabNavigator';
import ProfileIcon from '../assets/icons/account.svg';
import ProfileOutLineIcon from '../assets/icons/account_outline.svg';
import RoomList from '../screens/RoomList';

const Tab = createBottomTabNavigator();

const BottomTabNavigatior = ({navigation, route}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
        },
        headerShown: false,
        tabBarIcon: ({focused}) => {
          const WIDTH = 25,
            HEIGHT = 25;

          if (route.name === ROOM_LIST_BOTTOM) {
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
          } else if (route.name === NOTIFICATION_BOTTOM) {
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
          } else if (route.name === ACCOUNT_BOTTOM) {
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
        name={ROOM_LIST_BOTTOM}
        component={RoomList}
        options={{
          headerShown: true,
        }}
      />
      <Tab.Screen
        name={NOTIFICATION_BOTTOM}
        options={{headerShown: false}}
        component={NotiTabNavigator}
      />
      <Tab.Screen
        name={ACCOUNT_BOTTOM}
        options={{headerShown: false}}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatior;
