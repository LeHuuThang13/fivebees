import React from 'react';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {MANAGE} from '../../constants/routeNames';

const ManagingDevices = ({navigation}) => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigation.navigate(MANAGE);
    },
  });
  return <Container></Container>;
};

export default ManagingDevices;
