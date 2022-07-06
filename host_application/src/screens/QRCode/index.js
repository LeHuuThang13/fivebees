import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';
import IconMenu from '../../assets/icons/menu_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import Container from '../../components/common/Container';

const QRCode = () => {
  SettingHeaderNavigator.settingHeaderNavigator({MenuIcon: IconMenu});

  return (
    <Container>
      <Text>Hi from QRCode</Text>
    </Container>
  );
};

export default QRCode;
