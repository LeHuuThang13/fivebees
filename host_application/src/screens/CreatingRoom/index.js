import React, {useContext, useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View, BackHandler} from 'react-native';
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

const CreatingRoom = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const {id_room: id} = route.params;
  //Setting header
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    IconRight: CheckIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_ROOMS);
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
      navigation.navigate(MANAGING_ROOMS);
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
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    createRoomByIdBuilding(form)(roomsDispatch)(localFile)(id)(() => {
      navigate(MANAGING_ROOMS, {
        id_building: id,
      });
      setForm({});
      setLocalFile('');
      setRoomNumber('');
      setDescription('');
      setStatus('');
    });
  };

  return (
    <View style={[GlobalStyles.fullScreen, GlobalStyles.paddingContainer]}>
      <View>
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
            onChange({name: 'room_number', value});
            return setRoomNumber(value);
          }}
          placeholder="Nhập tên phòng"
          value={roomNumber}
          error={roomNumber === '' && error?.errors?.room_number?.[0]}
        />

        <CustomInput
          label="Trạng thái"
          onChangeText={value => {
            onChange({name: 'status', value});
            return setStatus(value);
          }}
          placeholder="Nhập tên trạng thái phòng"
          value={status}
          error={status === '' && error?.errors?.status?.[0]}
        />

        <CustomInput
          label="Mô tả"
          onChangeText={value => {
            onChange({name: 'description', value});
            return setDescription(value);
          }}
          placeholder="Nhập mô tả"
          value={description}
          error={description === '' && error?.errors?.description?.[0]}
        />

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Thêm phòng'}
          loading={loading_room}
          disabled={loading_room}
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

export default CreatingRoom;
