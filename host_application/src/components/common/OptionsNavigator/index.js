import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../../../assets/themes/colors';

const OptionsNavigator = (toggleDrawer, iconSvg, styles) => {
  return (
    <TouchableOpacity
      onPress={() => {
        toggleDrawer();
      }}>
      <View style={{styles}}>{iconSvg && iconSvg}</View>
    </TouchableOpacity>
  );
};

export default OptionsNavigator;
