import React from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import styles from './styles';
import {ROOM_LIST} from '../../constants/routeNames';
import GlobalStyles from '../../../GlobalStyles';
import HeaderDetails from '../../components/common/HeaderDetails';
import Device from '../../components/common/Device';

const RoomDetails = ({navigation, route}) => {
  SettingHeaderNavigator.settingChildHeaderBackToHomeNavigator({
    Icon: PreviousIcon,
    navigation: navigation,
  });

  const Devices = () => {
    return (
      <View style={styles.deviceContainer}>
        <Image source={require('../../assets/images/tv_samsung.jpg')} />
        <View></View>
      </View>
    );
  };

  return (
    <View style={[styles.container, GlobalStyles.fullScreen]}>
      <HeaderDetails
        textTitleOne={'Tình trạng'}
        contentTextTitleOne={'Đang sử dụng'}
        textTitleTwo={'Tổng thiết bị'}
        contentTextTitleTwo={10}
        textTitleThree={'Thiết bị hư hỏng'}
        contentTextTitleThree={0}
      />
      <ScrollView>
        <Device />
      </ScrollView>
    </View>
  );
};

export default RoomDetails;
