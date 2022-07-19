import React from 'react';
import {View} from 'react-native';
import GlobalStyles from '../../../GlobalStyles';
import CustomInput from '../../components/CustomInput';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import CheckIcon from '../../assets/icons/check.svg';
import {MANAGING_ROOMS} from '../../constants/routeNames';

const CreatingRoom = () => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    IconRight: CheckIcon,
    styles: {
      marginHorizontal: 10,
    },
    stackNavigate: MANAGING_ROOMS,
  });
  return (
    <View style={[GlobalStyles.fullScreen, GlobalStyles.paddingContainer]}>
      <CustomInput placeholder={'Nhập tên phòng'} title={'Tên phòng'} />
    </View>
  );
};

export default CreatingRoom;
