import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import GlobalStyles from '../../../GlobalStyles';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import CheckIcon from '../../assets/icons/check.svg';
import {MANAGING_ROOMS} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/common/InputCustom';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from '../../components/common/ImagePicker';
import styles from '../../components/CustomButton/styles';
import createRoomByIdBuilding from '../../context/actions/rooms/createRoomByIdBuilding';
import editRoom from '../../context/actions/rooms/editRoom';
import getSingleRoom from '../../context/actions/rooms/getSingleRoom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ANNOUNCE,
  DATA_HAS_NOT_CHANGED,
  PLEASE_FILL_DATA,
  UPDATE,
} from '../../constants/actions';

const UpdatingRoom = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const {id_room, id_building, name_building} = route.params;

  //Setting header
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    IconRight: CheckIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_ROOMS, {
        id_building: id_building,
        name_building: name_building,
      });
    },
  });

  //Global variables
  const {
    roomsDispatch,
    roomsState: {
      getRoom: {loading: loading_room, data},
      updateRoom: {loading: loading_update, error},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    let isMounted = true;
    getSingleRoom(id_room)(roomsDispatch)({isMounted, setIsLoaded});
    return () => (isMounted = false);
  }, [navigation]);

  // Hook fields
  useEffect(() => {
    if (data) {
      const {building_id, description, room_number, status, photos} = data;
      setForm({...form, building_id, description, room_number, status});
      setLocalFile(photos?.[0]);
    }

    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigate(MANAGING_ROOMS, {
        id_building_create: id_building,
        name_building_create: name_building,
        id_building: id_building,
        name_building: name_building,
      });
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, [data]);

  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState(data?.photos?.[0]);
  const sheetRef = useRef(null);
  const [roomNumber, setRoomNumber] = useState(data?.room_number);
  const [status, setStatus] = useState(data?.status);
  const [description, setDescription] = useState(data?.description);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
      typeof form?.room_number == 'string' &&
      typeof form?.status == 'string' &&
      typeof form?.description == 'string' &&
      localFile &&
      form?.room_number.trim() !== '' &&
      form?.status.trim() !== '' &&
      form?.description.trim() !== ''
    ) {
      if (isEdited) {
        const token = await AsyncStorage.getItem('token');
        editRoom(form)(roomsDispatch)({localFile, token, setIsLoaded})(
          id_building,
        )(id_room)(() => {
          navigate(MANAGING_ROOMS, {
            id_building: id_building,
          });
          setIsLoaded(false);
          setForm({});
          setLocalFile('');
          setRoomNumber('');
          setDescription('');
          setStatus('');
          setIsLoading(false);
        });
      } else {
        Alert.alert(ANNOUNCE, DATA_HAS_NOT_CHANGED, [
          {
            text: 'Đã hiểu',
            onPress: () => console.log('Đã hiểu'),
            style: 'cancel',
          },
        ]);
      }
    } else {
      Alert.alert(ANNOUNCE, PLEASE_FILL_DATA, [
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
      {isLoaded ? (
        <>
          <ScrollView>
            <View style={styles.imageWrapper}>
              {!!localFile && (
                <Image
                  width={150}
                  height={150}
                  source={{uri: localFile?.path ? localFile?.path : localFile}}
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
                onChange({name: 'room_number', value});
                return setRoomNumber(value);
              }}
              placeholder="Nhập tên phòng"
              value={form.room_number}
              error={error?.errors?.room_number?.[0]}
            />

            <CustomInput
              label="Trạng thái"
              onChangeText={value => {
                onChange({name: 'status', value});
                return setStatus(value);
              }}
              placeholder="Nhập tên trạng thái phòng"
              value={form.status}
              error={error?.errors?.status?.[0]}
            />

            <CustomInput
              label="Mô tả"
              onChangeText={value => {
                onChange({name: 'description', value});
                return setDescription(value);
              }}
              placeholder="Nhập mô tả"
              value={form.description}
              error={error?.errors?.description?.[0]}
            />

            <CustomButton
              onPress={onSubmit}
              primary
              title={UPDATE}
              loading={loading_update}
              disabled={loading_update}
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
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default UpdatingRoom;
