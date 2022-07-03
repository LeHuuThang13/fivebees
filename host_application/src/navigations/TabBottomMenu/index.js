import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/common/Container';
import ImgHeaderSidebarMenu from '../../assets/images/Header_bg_sidebar.svg';
import styles from './styles';
import {ROOM_LIST, NOTIFICATION} from '../../constants/routeNames';

import BellIcon from '../../assets/icons/bell.svg';
import RoomIcon from '../../assets/icons/room.svg';
import colors from '../../assets/themes/colors';

const TabBottomMenu = props => {
  const {svgIcon, nameIcon, isFocused} = props;

  const getBorderBottomWhenFocused = isFocused => {
    if (isFocused) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <SafeAreaView>
      <View style={[styles.iconBody, {borderBottomWidth: isFocused ? 2 : 0}]}>
        <Text style={[styles.icon, {color: 'red'}]}>{svgIcon}</Text>
        <Text
          style={[
            styles.nameIcon,
            {color: isFocused ? colors.primary : colors.secondary},
          ]}>
          {nameIcon}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TabBottomMenu;
