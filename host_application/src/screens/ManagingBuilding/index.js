import React from 'react';
import {ScrollView, View} from 'react-native';
import GlobalStyles from '../../../GlobalStyles';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import ManagingContainer from '../../components/common/Managing';
import {MANAGE, MANAGING_ROOMS} from '../../constants/routeNames';
import CustomCreatingButton from '../../components/CustomCreatingButton';
// Sgv Icons
import Room from '../../assets/icons/room_outline.svg';
import Setting from '../../assets/icons/setting_white.svg';
import PreviousIcon from '../../assets/icons/previous_icon.svg';

const ManagingBuilding = ({navigation}) => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    stackNavigate: MANAGE,
  });

  return (
    <View style={[{flex: 1}]}>
      <CustomCreatingButton
        onPress={() => {
          navigation.navigate(CREATING_ROOM);
        }}
      />
      <ScrollView
        style={[{backgroundColor: 'white'}, GlobalStyles.paddingContainer]}>
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
      </ScrollView>
    </View>
  );
};

export default ManagingBuilding;
