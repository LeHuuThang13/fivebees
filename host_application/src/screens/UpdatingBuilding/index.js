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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      navigate(MANAGING_BUILDING, {
        refesh: true,
      });
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
      setLocalFile(photos?.[0]);
      setBuildingId(id);
    }

    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate(MANAGING_BUILDING, {
        isReload: true,
      });
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, [route]);

  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState(params?.building?.photos?.[0]);
  const sheetRef = useRef(null);
  const [name, setName] = useState(params?.building?.name);
  const [email, setEmail] = useState(params?.building?.email);
  const [address, setAddress] = useState(params?.building?.address);
  const [hotline, sethotline] = useState(params?.building?.hotline);
  const [buildingId, setBuildingId] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

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

  const onSubmit = async () => {
    if (
      typeof name == 'string' &&
      typeof email == 'string' &&
      typeof address == 'string' &&
      typeof hotline == 'string' &&
      localFile &&
      name !== '' &&
      email !== '' &&
      address !== '' &&
      hotline !== ''
    ) {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (isEdited) {
        editBuilding(form)(buildingsDispatch)({
          localFile,
          buildingId,
          token,
          user,
          setDisabledBtn,
        })(() => {
          setIsLoading(true);
          navigate(MANAGING_BUILDING, {
            refresh: true,
          });
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
    } else {
      Alert.alert('Thông báo', 'Vui nhập đầy đủ!', [
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
              source={{
                uri: localFile?.path
                  ? localFile?.path.replace('http://', 'https://')
                  : localFile.replace('http://', 'https://'),
              }}
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
          error={error?.errors?.name?.[0]}
        />

        <CustomInput
          label="Email"
          onChangeText={value => {
            onChange({name: 'email', value});
            return setEmail(value);
          }}
          placeholder="Nhập tên email"
          value={form.email}
          error={error?.errors?.email?.[0]}
        />

        <CustomInput
          label="Address"
          onChangeText={value => {
            onChange({name: 'address', value});
            return setAddress(value);
          }}
          placeholder="Nhập địa chỉ"
          value={form.address}
          error={error?.errors?.address?.[0]}
        />

        <CustomInput
          label="Hotline"
          onChangeText={value => {
            onChange({name: 'hotline', value});
            return sethotline(value);
          }}
          placeholder="Nhập số điện thoại"
          value={form.hotline}
          error={error?.errors?.hotline?.[0]}
        />

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Cập nhập'}
          loading={loading_building || isLoading || disabledBtn}
          disabled={loading_building || isLoading || disabledBtn}
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
