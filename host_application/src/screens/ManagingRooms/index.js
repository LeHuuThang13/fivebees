import Container from '../../components/common/Container';
import React from 'react';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {MANAGE, MANAGING_BUILDING} from '../../constants/routeNames';

const ManagingRooms = () => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    stackNavigate: MANAGING_BUILDING,
  });
  return <Container></Container>;
};

export default ManagingRooms;
