import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import QRcode from '../QRcode/QRcode';
import HomeScreen from '../HomeScreen/HomeScreen';
import Help from '../Help/Help';
import  Icon from 'react-native-vector-icons/MaterialIcons';
const Drawer = createDrawerNavigator();

const HomeUserScreen = () => {
  return (
    <Drawer.Navigator initialRouteName='Trang chủ' >
    <Drawer.Screen name="Trang Chủ" component={HomeScreen} options={{
      
    }}/>
    <Drawer.Screen name="QR Code" component={QRcode} />
    <Drawer.Screen name='Hướng dẫn sử dụng' component={Help}/>
  </Drawer.Navigator>
  )
}

export default HomeUserScreen

const styles = StyleSheet.create({})