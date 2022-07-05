import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import colors from '../assets/themes/colors';

const SettingHeaderNavigator = {
  settingHeaderNavigator: props => {
    const {MenuIcon} = props;
    console.log(MenuIcon);

    const {setOptions, toggleDrawer} = useNavigation();
    useEffect(() => {
      setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              toggleDrawer();
            }}>
            <View style={{marginHorizontal: 0}}>
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
};

export default SettingHeaderNavigator;
