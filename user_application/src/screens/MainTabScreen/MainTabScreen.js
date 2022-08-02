import React from 'react'
import RoomScreen from '../Room/RoomScreen'
import HistoryScreen from '../History/HistoryScreen'
import Notification from '../Notification/Notification'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Icon } from 'react-native-vector-icons/icon';
const Tab = createBottomTabNavigator();
const MainTabScreen = () =>(
    <Tab.Navigator
    initialRouteName="Room"
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      headerShown:false
    }}
  >
    <Tab.Screen
      name="Room"
      component={RoomScreen}
      // options={{
      //   tabBarLabel: 'Home',
      //   tabBarIcon: ({ color, size }) => (
      //     <Icon name="meeting-room" color={color} size={size} />
      //   ),
      // }}
    />
    <Tab.Screen
      name="Notifications"
      component={Notification}
      // options={{
      //   tabBarLabel: 'Updates',
      //   tabBarIcon: ({ color, size }) => (
      //     <Icon name="notifications" color={color} size={size} />
      //   ),
      //   tabBarBadge: 3,
      // }}
    />
    <Tab.Screen
      name="History"
      component={HistoryScreen}
      // options={{
      //   tabBarLabel: 'Profile',
      //   tabBarIcon: ({ color, size }) => (
      //     <Icon name="history" color={color} size={size} />
      //   ),
      // }}
    />
  </Tab.Navigator>
);
export default MainTabScreen ;