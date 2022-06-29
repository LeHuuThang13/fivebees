import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Notification from './Notification';
import History from './History';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Room from './Room'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    
       <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarShowLabel:false
       }}>
        
        <Tab.Screen name='Room' component={Room} options={{ tabBarIcon: ({color, size}) => (
            <Icon name='meeting-room' color={color} size={size}/>
        ) }}/>
      <Tab.Screen name='Notifications' component={Notification} options={{ tabBarIcon: ({color, size}) => (
            <Icon name='notifications' color={color} size={size}/>
        )}}/>
        <Tab.Screen name='History' component={History} options={{ tabBarIcon: ({color, size}) => (
            <Icon name='history' color={color} size={size}/>
        ) }}/>
     
        
       </Tab.Navigator>
       
        
  );
}
  



// 

export default TabNavigator

const styles = StyleSheet.create({})