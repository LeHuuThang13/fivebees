import React from 'react';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import ManagingContainer from '../../components/common/Managing';
import Setting from '../../assets/icons/setting_white.svg';
import Room from '../../assets/icons/room_outline.svg';
import {MANAGE, MANAGING_ROOMS} from '../../constants/routeNames';
import PlusIcon from '../../assets/icons/plus_icon.svg';
import {TouchableOpacity} from 'react-native';

const ManagingBuilding = ({navigation}) => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    stackNavigate: MANAGE,
  });

  return (
    <Container style={{backgroundColor: 'white'}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          padding: 0,
          zIndex: 3,
        }}>
        <PlusIcon />
      </TouchableOpacity>
      <ManagingContainer
        managingName={'Tòa A'}
        totalManaging={'Số lượng phòng'}
        totalDevices={10}
        onPress={() => {
          navigation.navigate(MANAGING_ROOMS);
        }}
        IconBtn={<Setting />}
        titleBtn={'Quản lý phòng'}
        IconManaging={<Room />}
      />

      <ManagingContainer
        managingName={'Tòa B'}
        totalManaging={'Số lượng phòng'}
        totalDevices={10}
        onPress={() => {
          navigation.navigate(MANAGING_ROOMS);
        }}
        IconBtn={<Setting />}
        titleBtn={'Quản lý phòng'}
        IconManaging={<Room />}
      />

      <ManagingContainer
        managingName={'Tòa C'}
        totalManaging={'Số lượng phòng'}
        totalDevices={10}
        onPress={() => {
          navigation.navigate(MANAGING_ROOMS);
        }}
        IconBtn={<Setting />}
        titleBtn={'Quản lý phòng'}
        IconManaging={<Room />}
      />
    </Container>
  );
};

export default ManagingBuilding;
