import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import colors from '../assets/themes/colors';
import {MANAGE} from '../constants/routeNames';

const SettingHeaderNavigator = {
  settingHeaderNavigator: props => {
    const {MenuIcon, styles} = props;
    const {setOptions, toggleDrawer} = useNavigation();
    useEffect(() => {
      setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              toggleDrawer();
            }}>
            <View
              style={[
                styles,
                {
                  paddingRight: 10,
                },
              ]}>
              <MenuIcon />
            </View>
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.bg_primary,
        },
        headerTintColor: colors.white,
      });
    }, []);
  },
  settingChildHeaderNavigator: props => {
    const {Icon, styles, onPressBtnLeft, onPressBtnRight} = props;
    const {setOptions, navigate} = useNavigation();
    useEffect(() => {
      setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={onPressBtnLeft}>
            <View style={[stylesHeader.leftIcon, styles]}>
              <Text>
                <Icon />
              </Text>
            </View>
          </TouchableOpacity>
        ),
        headerRight: () => {
          return onPressBtnRight;
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.bg_primary,
        },
        headerTintColor: colors.white,
      });
    }, []);
  },
  settingChildHeaderBackToHomeNavigator: props => {
    const {Icon, previousBtn, styles} = props;
    const {setOptions} = useNavigation();
    useEffect(() => {
      setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => previousBtn()}>
            <View style={[stylesHeader.leftIcon, styles]}>
              <Icon />
            </View>
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.bg_primary,
        },
        headerTintColor: colors.white,
      });
    }, []);
  },
};

const stylesHeader = StyleSheet.create({
  leftIcon: {
    paddingHorizontal: 10,
  },
});

export default SettingHeaderNavigator;
