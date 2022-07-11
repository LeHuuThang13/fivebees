import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ACCOUNT,
  ACCOUNT_BOTTOM,
  QRCODE,
  QRCODE_BOTTOM,
  ROOM_LIST,
  ROOM_LIST_BOTTOM,
} from '../constants/routeNames';
import TabBottomMenu from './TabBottomMenu';
import RoomIcon from '../assets/icons/room.svg';
import RoomOutLineIcon from '../assets/icons/room_outline.svg';
import QRCodeIcon from '../assets/icons/QRCode.svg';
import QRCodeutLineIcon from '../assets/icons/QRCode_outline.svg';
import QRCodeTabNavigator from './QRCodeTabNavigator';
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
          } else if (route.name === QRCODE_BOTTOM) {
            return focused ? (
              <TabBottomMenu
                svgIcon={<QRCodeIcon width={WIDTH} height={HEIGHT} />}
                isFocused={focused}
                nameIcon={QRCODE}
              />
            ) : (
              <TabBottomMenu
                svgIcon={<QRCodeutLineIcon width={WIDTH} height={HEIGHT} />}
                nameIcon={QRCODE}
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
        name={QRCODE_BOTTOM}
        options={{headerShown: false}}
        component={QRCodeTabNavigator}
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
