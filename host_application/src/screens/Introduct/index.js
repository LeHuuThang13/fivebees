import React from 'react';
import {Text, View} from 'react-native';
import MenuIcon from '../../assets/icons/menu_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';

const Introduce = () => {
  SettingHeaderNavigator.settingHeaderNavigator({MenuIcon: MenuIcon});

  return (
    <View>
      <Text>Hi from Introduce</Text>
    </View>
  );
};

export default Introduce;
