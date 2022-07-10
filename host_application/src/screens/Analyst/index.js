import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconMenu from '../../assets/icons/menu_icon.svg';
import AnalystContainer from '../../components/common/Analyst';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';

const Analyst = () => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: IconMenu,
    styles: {
      marginHorizontal: 10,
    },
  });

  return (
    <Container>
      <AnalystContainer
        title={'Tổng số thiết bị'}
        content={'100 thiết bị'}
        titleNavigation={'Xem chi tiết'}
      />

      <AnalystContainer
        title={'Tòa nhà'}
        content={'3 tòa nhà'}
        titleNavigation={'Xem chi tiết'}
      />
      <AnalystContainer
        title={'Thiết bị cần sửa chữa'}
        content={'2 thiết bị'}
        titleNavigation={'Xem chi tiết'}
      />

      <AnalystContainer
        title={'Thiết bị tổn hại'}
        content={'12 thiết bị'}
        titleNavigation={'Xem chi tiết'}
      />
    </Container>
  );
};

export default Analyst;
