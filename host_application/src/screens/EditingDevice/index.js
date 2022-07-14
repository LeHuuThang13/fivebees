import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ROOMDETAILS} from '../../constants/routeNames';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import GlobalStyles from '../../../GlobalStyles';
import CustomInput from '../../components/CustomInput';
import CheckIcon from '../../assets/icons/check.svg';
const EditingDevice = () => {
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    IconRight: CheckIcon,
    styles: {
      marginHorizontal: 10,
    },
    stackNavigate: ROOMDETAILS,
  });

  const [isValid, setIsValid] = useState(false);

  return (
    <View style={[GlobalStyles.fullScreen, GlobalStyles.paddingContainer]}>
      <CustomInput
        placeholder={'Nhập tên thiết bị'}
        value={'Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU8000KXXV/'}
        title={'Tên thiết bị'}
      />

      <CustomInput
        placeholder={'Nhập loại thiết bị'}
        value={'TV'}
        title={'Loại thiết bị'}
      />

      <CustomInput
        placeholder={'Nhập số lượng thiết bị'}
        value={1}
        title={'Số lượng thiết bị'}
      />
    </View>
  );
};

export default EditingDevice;
