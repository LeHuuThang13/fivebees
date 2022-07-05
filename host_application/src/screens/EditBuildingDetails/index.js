import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../assets/themes/colors';
import Container from '../../components/common/Container';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {MANAGE} from '../../constants/routeNames';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';

// import styles from './styles';

const Managing = ({navigation, route}) => {
  const {setOptions, toggleDrawer} = useNavigation();
  const [elementVisible, setElementVisible] = useState(false);

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    previousStack: MANAGE,
  });


  return (
    <Container>
      <Text>Hi from eding building detials</Text>
    </Container>
  );
};

export default Managing;
