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
import {
  MANAGING_ROOMS,
  MANAGING_ROOM_DETAILS,
} from '../../constants/routeNames';
import SelectingDropDown from '../../components/common/SelectDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Announce from '../../components/common/Announce';
import {ANNOUNCE, PLEASE_FILL_DATA} from '../../constants/actions';

const CreatingFacility = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const {
    isFromManagingRoom,
    id_room: idRoom,
    id_building: idBuilding,
    name_building: nameBuilding,
  } = route.params;

  //Setting header
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    IconRight: CheckIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate({
        name: MANAGING_ROOM_DETAILS,
        params: {
          id_building: idBuilding,
          name_building: nameBuilding,
        },
        merge: true,
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
  } = useContext(GlobalContext);

  // Hook fields
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    // Back button real device
    getCategories()(categoriesDispatch);
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigate({
        name: MANAGING_ROOM_DETAILS,
        params: {
          id_building: idBuilding,
          name_building: nameBuilding,
          reload: true,
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
  const [name, setName] = useState(form?.name);
  const [category, setCategory] = useState({});
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
  console.log(
    'id_room:',
    idRoom,
    'id_building:',
    idBuilding,
    'name_building:',
    nameBuilding,
  );

  const onSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    if (
      localFile &&
      typeof name == 'string' &&
      typeof description == 'string' &&
      typeof category == 'number' &&
      category > 0
    ) {
      createFacility(form)(facilitiesDispatch)({
        localFile,
        category,
        idRoom,
        token,
      })(() => {
        navigate({
          name: MANAGING_ROOM_DETAILS,
          params: {
            id_building: idBuilding,
            name_building: nameBuilding,
          },
          merge: true,
        });
        setForm({});
        setLocalFile('');
        setName('');
        setDescription('');
        setCategory('');
      });
    } else {
      Announce(ANNOUNCE, PLEASE_FILL_DATA);
    }
  };

  return (
    <SafeAreaView
      style={[GlobalStyles.fullScreen, GlobalStyles.paddingContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          {!!localFile && (
            <TouchableOpacity
              onPress={openSheet}
              style={{flexDirection: 'column', alignItems: 'center'}}>
              <Image
                width={150}
                height={150}
                source={{uri: localFile?.path}}
                style={styles.imageView}
              />
              <Text style={styles.colorChoosingImageText}>Choose image</Text>
            </TouchableOpacity>
          )}

          {!localFile && (
            <TouchableOpacity
              onPress={openSheet}
              style={{flexDirection: 'column', alignItems: 'center'}}>
              <Image
                width={150}
                height={150}
                source={require('../../assets/images/default_image.png')}
                style={styles.imageView}
              />
              <Text style={styles.colorChoosingImageText}>Choose image</Text>
            </TouchableOpacity>
          )}
        </View>

        <CustomInput
          label="Tên thiết bị"
          onChangeText={value => {
            onChange({name: 'name', value});
            return setName(value);
          }}
          placeholder="Nhập tên thiết bị"
          value={name}
          error={error?.error?.name?.[0]}
        />

        <CustomInput
          label="Mô tả"
          onChangeText={value => {
            onChange({name: 'description', value});
            return setDescription(value);
          }}
          placeholder="Nhập mô tả thiết bị"
          value={description}
          error={error?.error?.description?.[0]}
        />

        <SelectingDropDown
          title="Loại thiết bị"
          data={data_categories}
          setState={setCategory}
          setIsEdited={setIsEdited}
        />

        <CustomButton
          onPress={onSubmit}
          primary
          title={'Tạo mới thiết bị'}
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
