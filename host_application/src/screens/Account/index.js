import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconMenu from '../../assets/icons/menu_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import colors from '../../assets/themes/colors';
import Container from '../../components/common/Container';

const Account = ({navigation}) => {
  SettingHeaderNavigator.settingHeaderNavigator({MenuIcon: IconMenu});
  return (
    <Container>
      <Text>Hi from Account</Text>
    </Container>
  );
};

export default Account;
