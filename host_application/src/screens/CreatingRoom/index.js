import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  ScrollView,
  Alert,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatingRoom = ({navigation, route}) => {
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
      navigate({
        name: MANAGING_ROOMS,
        params: {
          id_building: id_building,
          name_building: name_building,
        },
        merge: true,
      });
    },
  });

  //Global variables
  const {
    roomsDispatch,
    roomsState: {
      createRoom: {loading: loading_room, error},
    },
  } = useContext(GlobalContext);

  // Hook fields

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigate({
        name: MANAGING_ROOMS,
        params: {
          id_building: id_building,
          name_building: name_building,
        },
        merge: true,
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
  const [roomNumber, setRoomNumber] = useState(form?.room_number);
  const [status, setStatus] = useState(form?.status);
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
    setForm({...form, [name]: value.trim()});
  };

  const onSubmit = async () => {
    if (
      typeof roomNumber == 'string' &&
      typeof status == 'string' &&
      typeof description == 'string' &&
      localFile &&
      roomNumber.trim() !== '' &&
      status.trim() !== '' &&
      description.trim() !== ''
    ) {
      const token = await AsyncStorage.getItem('token');
      createRoomByIdBuilding(form)(roomsDispatch)({localFile, token})(
        id_building,
      )(() => {
        navigate(MANAGING_ROOMS, {
          id_building: id_building,
        });
        setForm({});
        setLocalFile('');
        setRoomNumber('');
        setDescription('');
        setStatus('');
      });
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
            <Text style={[styles.colorChoosingImageText, GlobalStyles.color]}>
              Choose image
            </Text>
          </TouchableOpacity>
        </View>

        <CustomInput
          label="Tên phòng"
          onChangeText={value => {
            onChange({name: 'room_number', value});
            return setRoomNumber(value);
          }}
          placeholder="Nhập tên phòng"
          value={roomNumber}
          error={error?.errors?.room_number?.[0]}
        />

        <CustomInput
          label="Trạng thái"
          onChangeText={value => {
            onChange({name: 'status', value});
            return setStatus(value);
          }}
          placeholder="Nhập trạng thái "
          value={status}
          error={error?.errors?.status?.[0]}
        />

        <CustomInput
          label="Mô tả"
          onChangeText={value => {
            onChange({name: 'description', value});
            return setDescription(value);
          }}
          placeholder="Nhập mô tả"
          value={description}
          error={error?.errors?.description?.[0]}
        />

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Thêm'}
          loading={loading_room}
          disabled={loading_room}
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

export default CreatingRoom;
