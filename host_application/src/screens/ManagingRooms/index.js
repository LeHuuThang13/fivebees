import React from 'react';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {MANAGING_BUILDING} from '../../constants/routeNames';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import DeviceIcon from '../../assets/icons/device.svg';
import BrokenIcon from '../../assets/icons/broken.svg';
import Room from '../../components/common/Room';

const ManagingRooms = () => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    stackNavigate: MANAGING_BUILDING,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.wrapper, GlobalStyles.paddingContainer]}>
          <View>
            <Text>Tòa nhà: A</Text>
          </View>
          <View>
            <Text>Tổng số phòng: 10</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView style={GlobalStyles.paddingContainer}>
          <View>
            <Room
              roomName={'Phòng 101'}
              status={'Đang sử dụng'}
              totalDevices={10}
              totalBrokenDevices={0}
              IconDevice={DeviceIcon}
              IconBrokenDevice={BrokenIcon}
            />

            <Room
              roomName={'Phòng 102'}
              status={'Đang sử dụng'}
              totalDevices={10}
              totalBrokenDevices={0}
              IconDevice={DeviceIcon}
              IconBrokenDevice={BrokenIcon}
            />

            <Room
              roomName={'Phòng 103'}
              status={'Đang sử dụng'}
              totalDevices={10}
              totalBrokenDevices={0}
              IconDevice={DeviceIcon}
              IconBrokenDevice={BrokenIcon}
            />

            <Room
              roomName={'Phòng 104'}
              status={'Đang sử dụng'}
              totalDevices={10}
              totalBrokenDevices={0}
              IconDevice={DeviceIcon}
              IconBrokenDevice={BrokenIcon}
            />

            <Room
              roomName={'Phòng 105'}
              status={'Đang sử dụng'}
              totalDevices={10}
              totalBrokenDevices={0}
              IconDevice={DeviceIcon}
              IconBrokenDevice={BrokenIcon}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ManagingRooms;
