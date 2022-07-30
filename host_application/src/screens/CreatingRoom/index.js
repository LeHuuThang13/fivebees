import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import GlobalStyles from '../../../GlobalStyles';
import CustomInputt from '../../components/CustomInput';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import CheckIcon from '../../assets/icons/check.svg';
import {MANAGING_BUILDING, MANAGING_ROOMS} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/common/InputCustom';
import createBuilding from '../../context/actions/buildings/createBuilding';
import {StackActions, useNavigation} from '@react-navigation/native';

const CreatingRoom = () => {
  const {navigate} = useNavigation();
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    IconRight: CheckIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_BUILDING);
    },
    onPressBtnRight: <Text>123</Text>,
  });

  const {
    buildingsDispatch,
    buildingsState: {
      createBuilding: {loading_building, error},
    },
  } = useContext(GlobalContext);

  // form fields
  const [form, setForm] = useState({});
  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };
  const onSubmit = () => {
    createBuilding(form)(buildingsDispatch)(() => {
      navigate(MANAGING_BUILDING);
    });
  };

  return (
    <View style={[GlobalStyles.fullScreen, GlobalStyles.paddingContainer]}>
      <CustomInputt
        placeholder={'Nhập email'}
        onchangeText={value => {
          changeText({name: 'email', value: value});
        }}
        title={'Email'}
      />

      <CustomInput
        label="Name"
        onChangeText={value => {
          onChange({name: 'name', value});
        }}
        placeholder="Nhập tên tòa nhà"
        error={error?.errors?.name?.[0]}
      />

      <CustomInput
        label="Email"
        onChangeText={value => {
          onChange({name: 'email', value});
        }}
        placeholder="Nhập tên email"
        error={error?.errors?.email?.[0]}
      />

      <CustomInput
        label="Address"
        onChangeText={value => {
          onChange({name: 'address', value});
        }}
        placeholder="Nhập địa chỉ"
        error={error?.errors?.address?.[0]}
      />

      <CustomInput
        label="Hotline"
        onChangeText={value => {
          onChange({name: 'hotline', value});
        }}
        placeholder="Nhập số điện thoại"
        error={error?.errors?.hotline?.[0]}
      />

      <CustomButton
        onPress={onSubmit}
        primary
        title={'Thêm tòa nhà'}
        loading={loading_building}
        disabled={loading_building}
        error={error}
      />
    </View>
  );
};

export default CreatingRoom;
