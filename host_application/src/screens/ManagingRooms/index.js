import React from 'react';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {
  CREATING_ROOM,
  MANAGING_BUILDING,
  MANAGING_ROOM_DETAILS,
  ROOMDETAILS,
} from '../../constants/routeNames';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import DeviceIcon from '../../assets/icons/device.svg';
import BrokenIcon from '../../assets/icons/broken.svg';
import Room from '../../components/common/Room';
import CustomCreatingButton from '../../components/CustomCreatingButton';
import CustomHeaderDetails from '../../components/CustomHeaderDetails';
import Setting from '../../assets/icons/setting_white.svg';

const ManagingRooms = ({navigation}) => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    stackNavigate: MANAGING_BUILDING,
  });
  return (
    <View style={styles.container}>
      <CustomCreatingButton
        onPress={() => {
          navigation.navigate(CREATING_ROOM);
        }}
      />
      <CustomHeaderDetails
        firstText={'Tòa nhà: A'}
        secondText={'Tổng số phòng: 12'}
      />
      <View style={styles.body}>
        <ScrollView style={GlobalStyles.paddingContainer}>
          <View>
            <Room
              roomName={'Phòng 102'}
              status={'Đang sử dụng'}
              totalDevices={10}
              totalBrokenDevices={0}
              IconDevice={DeviceIcon}
              IconBrokenDevice={BrokenIcon}
              IconSetting={Setting}
              actions={{
                edit: () => {
                  console.log('edit');
                },
                delete: () => {
                  console.log('delete');
                },
              }}
              onPress={() => {
                navigation.navigate(MANAGING_ROOM_DETAILS);
              }}
            />
            <Room
              roomName={'Phòng 101'}
              status={'Đang sử dụng'}
              totalDevices={10}
              totalBrokenDevices={0}
              IconDevice={DeviceIcon}
              IconBrokenDevice={BrokenIcon}
              IconSetting={Setting}
              onPress={() => {
                navigation.navigate(MANAGING_ROOM_DETAILS);
              }}
              actions={{
                edit: () => {
                  console.log('edit');
                },
                delete: () => {
                  console.log('delete');
                },
              }}
            />

            <Room
              roomName={'Phòng 102'}
              status={'Đang sử dụng'}
              totalDevices={10}
              totalBrokenDevices={0}
              IconDevice={DeviceIcon}
              IconBrokenDevice={BrokenIcon}
              actions={true}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ManagingRooms;
