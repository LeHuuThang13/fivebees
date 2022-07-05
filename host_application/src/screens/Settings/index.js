import React from 'react';
import {Text, View} from 'react-native';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import IconMenu from '../../assets/icons/menu_icon.svg';

const Settings = () => {
  SettingHeaderNavigator.settingHeaderNavigator({MenuIcon: IconMenu});

  return (
    <View>
      <Text>Hi from Settings</Text>
    </View>
  );
};

export default Settings;
