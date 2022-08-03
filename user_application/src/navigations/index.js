import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GlobalContext} from '../context/Provider';
import colors from '../assets/themes/colors';
import AuthNavigator from './AuthNavigator';

const AppNavigator = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 255, 255)',
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={CustomTheme}>
      <View style={styles.fullScreen}>
        {isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
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
