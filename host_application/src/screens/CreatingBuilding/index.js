import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  DevSettings,
  BackHandler,
  ScrollView,
  Alert,
} from 'react-native';
import GlobalStyles from '../../../GlobalStyles';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import CheckIcon from '../../assets/icons/check.svg';
import {
  ACCOUNT,
  MANAGING_BUILDING,
  MANAGING_ROOMS,
} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/common/InputCustom';
import createBuilding from '../../context/actions/buildings/createBuilding';
import {StackActions, useNavigation} from '@react-navigation/native';
import ImagePicker from '../../components/common/ImagePicker';
import styles from '../../components/CustomButton/styles';
import CustomButtonIcon from '../../components/CustomButtonIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatingBuilding = ({navigation}) => {
  const {navigate} = useNavigation();

  //Setting header
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    IconRight: CheckIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_BUILDING);
    },
  });

  //Global variables
  const {
    buildingsDispatch,
    buildingsState: {
      createBuilding: {loading_building, error},
    },
  } = useContext(GlobalContext);

  // Hook fields

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate(MANAGING_BUILDING);
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, [navigation]);

  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState('');
  const sheetRef = useRef(null);
  const [name, setName] = useState(form?.name);
  const [email, setEmail] = useState(form?.email);
  const [address, setAddress] = useState(form?.address);
  const [hotline, sethotline] = useState(form?.hotline);
  const [uploading, setIsUploading] = useState(false);

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

  const onSubmit = async () => {
    if (
      typeof name == 'string' &&
      typeof email == 'string' &&
      typeof address == 'string' &&
      typeof hotline == 'string' &&
      localFile
    ) {
      if (localFile?.size) {
        setIsUploading(false);
        const token = await AsyncStorage.getItem('token');
        createBuilding(form)(buildingsDispatch)({localFile, token})(() => {
          navigate(MANAGING_BUILDING);
          setForm({});
          setLocalFile('');
          setAddress('');
          setEmail('');
          setName('');
          sethotline('');
        });
      } else {
        setIsUploading(true);
      }
    } else {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ trường dữ liệu', [
        {
          text: 'Đã hiểu',
          onPress: () => console.log('Đã hiểu'),
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <View style={[GlobalStyles.fullScreen, GlobalStyles.paddingContainer]}>
      <ScrollView>
        <View style={styles.imageWrapper}>
          {!!localFile && (
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
            <Text>{localFile === '' && 'Vui lòng tải ảnh cho tòa nhà'}</Text>
          </TouchableOpacity>
        </View>

        <CustomInput
          label="Name"
          onChangeText={value => {
            onChange({name: 'name', value});
            return setName(value);
          }}
          placeholder="Nhập tên tòa nhà"
          value={name}
          error={error?.errors?.name?.[0]}
        />

        <CustomInput
          label="Email"
          onChangeText={value => {
            onChange({name: 'email', value});
            return setEmail(value);
          }}
          placeholder="Nhập tên email"
          value={email}
          error={error?.errors?.email?.[0]}
        />

        <CustomInput
          label="Address"
          onChangeText={value => {
            onChange({name: 'address', value});
            return setAddress(value);
          }}
          placeholder="Nhập địa chỉ"
          value={address}
          error={error?.errors?.address?.[0]}
        />

        <CustomInput
          label="Hotline"
          onChangeText={value => {
            onChange({name: 'hotline', value});
            return sethotline(value);
          }}
          placeholder="Nhập số điện thoại"
          value={hotline}
          error={error?.errors?.hotline?.[0]}
        />

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Thêm tòa nhà'}
          loading={loading_building || uploading}
          disabled={loading_building}
          error={error}
        />
      </ScrollView>

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
