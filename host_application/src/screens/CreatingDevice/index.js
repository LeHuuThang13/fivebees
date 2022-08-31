import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import GlobalStyles from '../../../GlobalStyles';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import CheckIcon from '../../assets/icons/check.svg';
import {GlobalContext} from '../../context/Provider';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/common/InputCustom';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from '../../components/common/ImagePicker';
import styles from '../../components/CustomButton/styles';
import createFacility from '../../context/actions/facilities/createFacility';
import getCategories from '../../context/actions/categories/getCategories';
import SelectDropdown from 'react-native-select-dropdown';
import {MANAGING_FACILITIES, MANAGING_ROOMS} from '../../constants/routeNames';
import getStatus from '../../context/actions/status/getStatus';
import getRooms from '../../context/actions/rooms/getRooms';
import SelectingDropDown from '../../components/common/SelectDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatingFacility = ({navigation, route}) => {
  const {navigate} = useNavigation();

  //Setting header
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    IconRight: CheckIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_FACILITIES, {
        reload: true,
      });
    },
  });

  //Global variables
  const {
    facilitiesDispatch,
    facilitiesState: {
      createFacility: {loading, data, error},
    },
    categoriesDispatch,
    categoriesState: {
      getCategories: {loading: loading_categories, data: data_categories},
    },
    statusDispatch,
    statusState: {
      getStatus: {loading: loading_status, data: data_status},
    },
    roomsDispatch,
    roomsState: {
      getRooms: {loading: loading_rooms, data: data_rooms},
    },
  } = useContext(GlobalContext);

  // Hook fields

  async function fetchData() {
    await Promise.all([
      getCategories()(categoriesDispatch),
      getStatus()(statusDispatch),
      getRooms()(roomsDispatch),
    ]).catch(err => {
      console.log('fetch data creating device : ', err.message);
    });
  }

  useEffect(() => {
    fetchData();

    BackHandler.addEventListener('hardwareBackPress', () => {
      navigate(MANAGING_FACILITIES, {
        reload: true,
      });
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
  const [category, setCategory] = useState({});
  const [room, setRoom] = useState([]);
  const [status, setStatus] = useState({});
  const [description, setDescription] = useState(form?.description);
  const [isEdited, setIsEdited] = useState(false);

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
    if (status == 2 || status == 4) {
      setRoom([]);
    }

    if (
      isEdited == true &&
      localFile &&
      typeof form?.name == 'string' &&
      typeof form?.description == 'string' &&
      typeof category == 'number' &&
      typeof status == 'number' &&
      form?.name.trim() !== '' &&
      form?.description.trim() !== ''
    ) {
      const token = await AsyncStorage.getItem('token');
      createFacility(form)(facilitiesDispatch)({
        localFile,
        category,
        room,
        status,
        token,
      })(() => {
        navigate(MANAGING_FACILITIES);
        setForm({});
        setLocalFile('');
        setName('');
        setDescription('');
        setCategory('');
        setRoom([]);
        setStatus([]);
      });
    } else {
      Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin!', [
        {
          text: 'Đã hiểu',
          onPress: () => console.log('Đã hiểu'),
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <SafeAreaView
      style={[GlobalStyles.fullScreen, GlobalStyles.paddingContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity onPress={openSheet} style={styles.imageWrapper}>
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
            <Text style={styles.colorChoosingImageText}>Choose image</Text>
          </TouchableOpacity>
        </View>

        <CustomInput
          label="Tên thiết bị"
          onChangeText={value => {
            onChange({name: 'name', value});
            return setName(value);
          }}
          placeholder="Nhập tên thiết bị"
          value={name}
        />

        <CustomInput
          label="Mô tả"
          onChangeText={value => {
            onChange({name: 'description', value});
            return setDescription(value);
          }}
          placeholder="Nhập mô tả thiết bị"
          value={description}
        />

        {status !== 2 && status !== 4 && (
          <SelectingDropDown
            title={'Chọn phòng'}
            data={data_rooms}
            setState={setRoom}
            setIsEdited={setIsEdited}
          />
        )}

        <SelectingDropDown
          title={'Chọn loại'}
          data={data_categories}
          setState={setCategory}
          setIsEdited={setIsEdited}
        />

        <SelectingDropDown
          title={'Chọn trạng thái'}
          data={data_status}
          setState={setStatus}
          setIsEdited={setIsEdited}
        />

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Thêm thiết bị'}
          loading={loading}
          disabled={loading}
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
    </SafeAreaView>
  );
};

export default CreatingFacility;
