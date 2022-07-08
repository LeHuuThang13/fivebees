import React from 'react';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import ManagingContainer from '../../components/common/Managing';
import Setting from '../../assets/icons/setting_white.svg';
import Room from '../../assets/icons/room.svg';
import {MANAGE} from '../../constants/routeNames';

const ManagingBuilding = ({navigation}) => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    stackNavigate: MANAGE,
  });

  return (
    <Container>
      <ManagingContainer
        managingName={'Quản lý tòa nhà'}
        totalManaging={'Số lượng tòa nhà'}
        totalDevices={3}
        onPress={() => {
          // navigation.navigate(MANAGING_BUILDING);
        }}
        IconBtn={<Setting />}
        titleBtn={'Quản lý tòa nhà'}
        IconManaging={<BuildingIcon />}
      />
    </Container>
  );
};

export default ManagingBuilding;
