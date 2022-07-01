import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from '../screens/Notification';
import RoomList from '../screens/RoomList';
import {NOTIFICATION, ROOM_LIST} from '../constants/routeNames';

const Tab = createBottomTabNavigator();
const BottomTabNavigatior = () => {
  return (
    <Tab.Navigator initialRouteName={ROOM_LIST}>
      <Tab.Screen name={ROOM_LIST} component={RoomList} />
      <Tab.Screen name={NOTIFICATION} component={Notification} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatior;
