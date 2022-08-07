import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  SafeAreaView,
  ScrollView,
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
      navigate(MANAGING_FACILITIES);
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
    ]);
  }

  useEffect(() => {
    fetchData();

    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate(MANAGING_ROOMS);
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, [navigation]);

  console.log(data_rooms);

  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState('');
  const sheetRef = useRef(null);
  const [name, setName] = useState(form?.name);
  const [category, setCategory] = useState({});
  const [room, setRooms] = useState({});
  const [status, setStatus] = useState({});
  const [description, setDescription] = useState(form?.description);

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
    createFacility(form)(facilitiesDispatch)({
      localFile,
      category,
      room,
      status,
    })(() => {
      navigate(MANAGING_FACILITIES);
      setForm({});
      setLocalFile('');
      setName('');
      setDescription('');
      setCategory('');
      setRooms({});
      setStatus({});
    });
  };

  return (
    <SafeAreaView
      style={[GlobalStyles.fullScreen, GlobalStyles.paddingContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text>{localFile === '' && 'Vui lòng tải ảnh cho phòng'}</Text>
          </TouchableOpacity>
        </View>

        <CustomInput
          label="Tên phòng"
          onChangeText={value => {
            onChange({name: 'name', value});
            return setName(value);
          }}
          placeholder="Nhập tên phòng"
          value={name}
          error={name === '' && error?.errors?.name?.[0]}
        />

        <CustomInput
          label="Mô tả"
          onChangeText={value => {
            onChange({name: 'description', value});
            return setDescription(value);
          }}
          placeholder="Nhập mô tả phòng"
          value={description}
          error={description === '' && error?.errors?.description?.[0]}
        />

        <SelectingDropDown
          title={'Chọn phòng'}
          data={data_rooms}
          setState={setRooms}
        />

        <SelectingDropDown
          title={'Chọn loại'}
          data={data_categories}
          setState={setCategory}
        />

        <SelectingDropDown
          title={'Chọn trạng thái'}
          data={data_status}
          setState={setStatus}
        />

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Thêm phòng'}
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
