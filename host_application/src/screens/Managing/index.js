import React from 'react';
import Container from '../../components/common/Container';
//icons
import MenuIcon from '../../assets/icons/menu_icon.svg';
import Setting from '../../assets/icons/setting_white.svg';
import Room from '../../assets/icons/room_outline.svg';
//constants
import {BUILDINGDETAILS} from '../../constants/routeNames';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import MorePopupMenu from '../../components/common/MorePopupMenu';
import Building from '../../components/common/Building';

const Managing = ({navigation}) => {
  SettingHeaderNavigator.settingHeaderNavigator({MenuIcon: MenuIcon});

  return (
    <Container>
      <Building
        MoreActions={
          <MorePopupMenu
            styles={{
              width: 30,
              flexDirection: 'row-reverse',
              position: 'absolute',
              right: 15,
              top: 10,
              zIndex: 1,
            }}
            actionNameEdit={'Chỉnh sửa'}
            actionNameDelete={'Xóa'}
            onPressEdit={() => {
              navigation.navigate(BUILDINGDETAILS);
            }}
            onPressDelete={() => {
              console.log('Xóa');
            }}
          />
        }
        buildingName={'Tòa A'}
        totalDevices={10}
        onPress={() => {
          console.log('hello world');
        }}
        IconBtn={<Setting />}
        titleBtn={'Quản lý phòng'}
        IconRoom={<Room />}
      />
    </Container>
  );
};

export default Managing;
