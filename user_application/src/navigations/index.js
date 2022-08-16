import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GlobalContext} from '../context/Provider';
import colors from '../assets/themes/colors';
import CheckQRNavigator from './CheckQRNavigator';
import HomeNavigator from './HomeNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './AuthNavigator';

const AppNavigator = () => {
  const {
    authState: {isLoggedIn},
    roomState: {isChecking},
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)',
      background: 'white',
    },
  };

  console.log('isChecking', isChecking);

  return (
    <NavigationContainer theme={CustomTheme}>
      <View style={styles.fullScreen}>
        {isAuthenticated ? (
          isChecking ? (
            <HomeNavigator />
          ) : (
            <CheckQRNavigator />
          )
        ) : (
          <AuthNavigator />
        )}
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});
