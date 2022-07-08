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
            <View style={[styles]}>
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
    const {Icon, IconRight, stackNavigate, styles} = props;
    const {setOptions, navigate} = useNavigation();
    useEffect(() => {
      setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigate(stackNavigate);
            }}>
            <View style={[stylesHeader.leftIcon, styles]}>
              <Icon />
            </View>
          </TouchableOpacity>
        ),
        headerRight: () => {
          return IconRight ? (
            <TouchableOpacity
              onPress={() => {
                navigate(stackNavigate);
              }}>
              <View style={stylesHeader.leftIcon}>
                <Text>
                  <IconRight width={20} height={30} />
                </Text>
              </View>
            </TouchableOpacity>
          ) : null;
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
    const {Icon, navigation, styles} = props;
    const {setOptions} = useNavigation();
    useEffect(() => {
      setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
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
