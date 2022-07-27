import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WelcomeUserScreen from './src/screens/WelcomeUserScreen/WelcomeUserScreen'
import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import HomeUserScreen from './src/screens/HomeUserScreen/HomeUserScreen'
import Navigation from './src/navigations'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    // <View >
    //   {/* <WelcomeUserScreen/> */}
    //   <Navigation/>
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={HomeUserScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})