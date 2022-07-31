import React, {useContext, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import GlobalStyles from '../../../GlobalStyles';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import CheckIcon from '../../assets/icons/check.svg';
import {MANAGING_BUILDING, MANAGING_ROOMS} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/common/InputCustom';
import createBuilding from '../../context/actions/buildings/createBuilding';
import {StackActions, useNavigation} from '@react-navigation/native';
import ImagePicker from '../../components/common/ImagePicker';
import styles from '../../components/CustomButton/styles';

const CreatingBuilding = () => {
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

  // Hook fields
  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState(null);
  const sheetRef = useRef(null);

  // Functions

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const onFileSelected = image => {
    closeSheet();
    setLocalFile(image);
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };
  const onSubmit = () => {
    createBuilding(form)(buildingsDispatch)(() => {
      navigate(MANAGING_BUILDING);
    })(localFile);
  };

  return (
    <View style={[GlobalStyles.fullScreen, GlobalStyles.paddingContainer]}>
      <View>
        <View style={styles.imageWrapper}>
          {console.log('localFile,localFile', localFile)}
          {localFile && (
            <Image
              width={150}
              height={150}
              source={{uri: localFile?.path}}
              style={styles.imageView}
            />
          )}

          {!localFile && (
            <Image
              width={150}
              height={150}
              source={require('../../assets/images/default_image.png')}
              style={styles.imageView}
            />
          )}

          <TouchableOpacity onPress={openSheet}>
            <Text style={styles.colorChoosingImageText}>Choose image</Text>
            <Text>{error?.errors && error?.errors?.email?.[0]}</Text>
          </TouchableOpacity>
        </View>

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

      <ImagePicker
        ref={sheetRef}
        closeSheet={closeSheet}
        openSheet={openSheet}
        onFileSelected={onFileSelected}
        localFile={localFile}
      />
    </View>
  );
};

export default CreatingBuilding;
