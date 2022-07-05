import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconMenu from '../../assets/icons/menu_icon.svg';
import colors from '../../assets/themes/colors';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';

const Analyst = () => {
  SettingHeaderNavigator.settingHeaderNavigator({MenuIcon: IconMenu});

  return (
    <View>
      <Text>Hi from Analyst</Text>
    </View>
  );
};

export default Analyst;
