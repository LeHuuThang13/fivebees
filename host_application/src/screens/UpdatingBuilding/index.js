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
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import ImagePicker from '../../components/common/ImagePicker';
import styles from '../../components/CustomButton/styles';
import CustomButtonIcon from '../../components/CustomButtonIcon';
import editBuilding from '../../context/actions/buildings/editBuilding';

const CreatingBuilding = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const {params} = useRoute();

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
    if (params?.building) {
      const {name, email, hotline, address, photos, id} = params.building;
      setForm({...form, name, email, hotline, address});
      setLocalFile(photos[0]);
      setBuildingId(id);
    }

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
  }, [route]);

  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState('');
  const sheetRef = useRef(null);
  const [name, setName] = useState(form?.name);
  const [email, setEmail] = useState(form?.email);
  const [address, setAddress] = useState(form?.address);
  const [hotline, sethotline] = useState(form?.hotline);
  const [buildingId, setBuildingId] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsEdited(true);
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
    setIsEdited(true);
  };

  const onSubmit = () => {
    if (isEdited) {
      editBuilding(form)(buildingsDispatch)({localFile, buildingId})(() => {
        setIsLoading(true);
        navigate(MANAGING_BUILDING);
        setForm({});
        setLocalFile('');
        setAddress('');
        setEmail('');
        setName('');
        sethotline('');
        setIsLoading(false);
      });
    } else {
      Alert.alert('Thông báo', 'Bạn có bất kỳ cập nhập nào!', [
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
          value={form.name}
          error={name === '' && error?.errors?.name?.[0]}
        />

        <CustomInput
          label="Email"
          onChangeText={value => {
            onChange({name: 'email', value});
            return setEmail(value);
          }}
          placeholder="Nhập tên email"
          value={form.email}
          error={email === '' && error?.errors?.email?.[0]}
        />

        <CustomInput
          label="Address"
          onChangeText={value => {
            onChange({name: 'address', value});
            return setAddress(value);
          }}
          placeholder="Nhập địa chỉ"
          value={form.address}
          error={address === '' && error?.errors?.address?.[0]}
        />

        <CustomInput
          label="Hotline"
          onChangeText={value => {
            onChange({name: 'hotline', value});
            return sethotline(value);
          }}
          placeholder="Nhập số điện thoại"
          value={form.hotline}
          error={hotline === '' && error?.errors?.hotline?.[0]}
        />

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Thêm tòa nhà'}
          loading={loading_building || isLoading}
          disabled={loading_building || isLoading}
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
