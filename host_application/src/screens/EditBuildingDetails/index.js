import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';
import Container from '../../components/common/Container';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {MANAGE} from '../../constants/routeNames';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import CheckIcon from '../../assets/icons/check.svg';

// import styles from './styles';

const Managing = ({navigation, route}) => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    stackNavigate: MANAGE,
    IconRight: CheckIcon,
  });

  return (
    <Container>
      <Text>Hi from eding building detials</Text>
    </Container>
  );
};

export default Managing;
