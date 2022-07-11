import React from 'react';
import Container from '../../components/common/Container';
//icons
import MenuIcon from '../../assets/icons/menu_icon.svg';
import BuildingIcon from '../../assets/icons/building.svg';
import Setting from '../../assets/icons/setting_white.svg';
import DeviceIcon from '../../assets/icons/device.svg';
//constants
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import ManagingContainer from '../../components/common/Managing';
import {MANAGING_BUILDING, MANAGING_DEVICES} from '../../constants/routeNames';

const Managing = ({navigation}) => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: MenuIcon,
    styles: {
      marginHorizontal: 10,
    },
  });

  return (
    <Container>
      <ManagingContainer
        managingName={'Quản lý tòa nhà'}
        totalManaging={'Số lượng tòa nhà'}
        totalDevices={3}
        onPress={() => {
          navigation.navigate(MANAGING_BUILDING);
        }}
        IconBtn={<Setting />}
        titleBtn={'Quản lý tòa nhà'}
        IconManaging={<BuildingIcon />}
      />

      <ManagingContainer
        managingName={'Quản lý thiết bị'}
        totalManaging={'Số lượng thiết bị'}
        totalDevices={10}
        onPress={() => {
          navigation.navigate(MANAGING_DEVICES);
        }}
        IconBtn={<Setting />}
        titleBtn={'Quản lý thiết bị'}
        IconManaging={<DeviceIcon />}
      />
    </Container>
  );
};

export default Managing;
