import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GlobalContext} from '../context/Provider';
import colors from '../assets/themes/colors';
import CheckQRNavigator from './CheckQRNavigator';
import HomeNavigator from './HomeNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {LOGIN_USER_SUCCESS} from '../constants/actionNames';

const AppNavigator = () => {
  const {
    authState: {isLoggedIn},
    authDispatch,
    roomState: {isChecking},
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setAuthLoaded(true);
        setIsAuthenticated(true);
        authDispatch({type: LOGIN_USER_SUCCESS});
      } else {
        setAuthLoaded(true);
        setIsAuthenticated(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getUser();
    console.log(123);
  }, [isLoggedIn]);

  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)',
      background: 'white',
    },
  };

  return (
    <>
      {console.log(authLoaded)}
      {authLoaded ? (
        <NavigationContainer theme={CustomTheme}>
          <View style={styles.fullScreen}>
            {console.log('isAuthenticated', isAuthenticated)}
            {console.log('isChecking', isChecking)}
            {console.log('authLoaded', authLoaded)}
            {isAuthenticated ? (
              isChecking ? (
                <DrawerNavigator />
              ) : (
                <CheckQRNavigator />
              )
            ) : (
              <AuthNavigator />
            )}
          </View>
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});
