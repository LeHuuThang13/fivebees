import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WelcomeUserScreen from './src/screens/WelcomeUserScreen/WelcomeUserScreen'
import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import HomeUserScreen from './src/screens/HomeUserScreen/HomeUserScreen'
import Navigation from './src/navigations'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import QRcode from './src/screens/QRcode/QRcode'
import Help from './src/screens/Help/Help'
import MainTabScreen from './src/screens/MainTabScreen/MainTabScreen'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    // <View >
    //   {/* <WelcomeUserScreen/> */}
    //   <Navigation/>
    // </View>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
    //     <Stack.Screen name='Home' component={HomeUserScreen} options={{headerShown: false}}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Trang chủ" screenOptions={{
      headerStyle :{
        backgroundColor: '#03a9f4'
      }
    }}>
        <Drawer.Screen name="Trang chủ" component={MainTabScreen} />
        <Drawer.Screen name="QR Code" component={QRcode} />
        <Drawer.Screen name="Hướng dẫn sử dụng" component={Help} /> 
      </Drawer.Navigator>
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})