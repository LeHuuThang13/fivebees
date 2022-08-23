import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ACCOUNT, ACCOUNT_BOTTOM, ROOM_DETAILS} from '../constants/routeNames';
import TabBottomMenu from './TabBottomMenu';
import RoomIcon from '../assets/icons/room.svg';
import RoomOutLineIcon from '../assets/icons/room_outline.svg';
import ProfileNavigator from './ProfileTabNavigator';
import ProfileIcon from '../assets/icons/account.svg';
import ProfileOutLineIcon from '../assets/icons/account_outline.svg';
import RoomDetails from '../screens/RoomDetails';
import colors from '../assets/themes/colors';

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

          if (route.name === ROOM_DETAILS) {
            return focused ? (
              <TabBottomMenu
                svgIcon={<RoomIcon width={WIDTH} height={HEIGHT} />}
                isFocused={focused}
                nameIcon={ROOM_DETAILS}
              />
            ) : (
              <TabBottomMenu
                svgIcon={<RoomOutLineIcon width={WIDTH} height={HEIGHT} />}
                nameIcon={ROOM_DETAILS}
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
        name={ROOM_DETAILS}
        component={RoomDetails}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.bg_primary,
          },
        }}
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
