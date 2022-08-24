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
import getRooms from '../../context/actions/rooms/getRooms';
import SelectDropdown from 'react-native-select-dropdown';
import {
  MANAGING_FACILITIES,
  MANAGING_ROOM_DETAILS,
} from '../../constants/routeNames';
import updateFacility from '../../context/actions/facilities/updateFacility';
import SelectingDropDown from '../../components/common/SelectDropdown';
import getStatus from '../../context/actions/status/getStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatingFacility = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const {item: item} = route.params;

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

  useEffect(() => {
    // Back button real device
    getCategories()(categoriesDispatch);
    getStatus()(statusDispatch);
    getRooms()(roomsDispatch);
    if (item) {
      const {name, id, room, description} = item;
      setForm({...form, name, description});
      setIsFacility(id);
      setRoom(room[0] ? room[0]?.id : []);
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate(MANAGING_FACILITIES, {
        reload: true,
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
  const [localFile, setLocalFile] = useState(item?.photos?.[0]);
  const sheetRef = useRef(null);
  const [name, setName] = useState(form?.name);
  const [category, setCategory] = useState(item?.category[0].id);
  const [status, setStatus] = useState(item?.status[0].id);
  const [room, setRoom] = useState([]);
  const [description, setDescription] = useState(form?.description);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idFacility, setIsFacility] = useState({});
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
    let isManagingDevices = true;
    const token = await AsyncStorage.getItem('token');

    if (status == 4 || status == 2) {
      if (name || localFile || description || category || status || room) {
        updateFacility(form)(facilitiesDispatch)({
          localFile,
          idFacility,
          token,
          category,
          room,
          status,
          isManagingDevices,
        })(() => {
          navigate(MANAGING_FACILITIES);
          setForm({});
          setLocalFile('');
          setName('');
          setDescription('');
          setCategory('');
          setIsLoading(false);
        });
      }
    } else if (status !== 4 || status !== 2) {
      if (typeof room == 'number') {
        if (name || localFile || description || category || status || room) {
          updateFacility(form)(facilitiesDispatch)({
            localFile,
            idFacility,
            token,
            category,
            room,
            status,
            isManagingDevices,
          })(() => {
            navigate(MANAGING_FACILITIES);
            setForm({});
            setLocalFile('');
            setName('');
            setDescription('');
            setCategory('');
            setIsLoading(false);
          });
        }
      } else {
        Alert.alert('Thông báo', 'Phòng chưa được chọn!', [
          {
            text: 'Đã hiểu',
            onPress: () => console.log('Đã hiểu'),
            style: 'cancel',
          },
        ]);
      }
    }
  };

  const {name: category_text} = item?.category[0];
  const {name: status_text} = item?.status[0];
  const {room_number: room_text} = item?.room[0]
    ? item?.room[0]
    : {room_number: null};

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
            <Text style={styles.colorChoosingImageText}>Choose image</Text>
          </TouchableOpacity>
        </View>

        <CustomInput
          label="Tên phòng"
          onChangeText={value => {
            onChange({name: 'name', value});
            return setName(value);
          }}
          placeholder="Nhập tên phòng"
          value={form.name}
          error={name === '' && error?.errors?.name?.[0]}
        />

        <CustomInput
          label="Mô tả"
          onChangeText={value => {
            onChange({name: 'description', value});
            return setDescription(value);
          }}
          placeholder="Nhập mô tả phòng"
          value={form.description}
          error={description === '' && error?.errors?.description?.[0]}
        />

        <SelectingDropDown
          title={category_text}
          data={data_categories}
          setIsEdited={setIsEdited}
          setState={setCategory}
        />

        <SelectingDropDown
          title={status_text}
          data={data_status}
          setIsEdited={setIsEdited}
          setState={setStatus}
        />

        {status !== 2 && status !== 4 && (
          <SelectingDropDown
            title={room_text ? room_text : 'Chưa chọn'}
            data={data_rooms}
            setIsEdited={setIsEdited}
            setState={setRoom}
          />
        )}

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Cập nhập'}
          loading={loading || isLoading}
          disabled={loading || isLoading}
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
