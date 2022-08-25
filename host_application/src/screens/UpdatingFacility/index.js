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
import {MANAGING_ROOM_DETAILS} from '../../constants/routeNames';
import updateFacility from '../../context/actions/facilities/updateFacility';
import SelectingDropDown from '../../components/common/SelectDropdown';
import getFacility from '../../context/actions/facilities/getFacility';
import Announce from '../../components/common/Announce';
import {
  ANNOUNCE,
  DATA_HAS_NOT_CHANGED,
  PLEASE_FILL_DATA,
} from '../../constants/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatingFacility = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const {
    id_room: idRoom,
    id_building: idBuilding,
    name_building: nameBuilding,
    item: item,
  } = route.params;
  const {id: id_facility} = item;

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
          reload: true,
        },
        merge: true,
      });
    },
  });

  //Global variables
  const {
    facilitiesDispatch,
    facilitiesState: {
      createFacility: {loading, error},
      getFacility: {loading: loading_getFacility, data: data_getFacility},
    },
    categoriesDispatch,
    categoriesState: {
      getCategories: {loading: loading_categories, data: data_categories},
    },
  } = useContext(GlobalContext);

  // Hook fields

  useEffect(() => {
    getCategories()(categoriesDispatch);
    getFacility(id_facility)(facilitiesDispatch);

    if (item) {
      const {name, description, category, id, photos} = item;
      setForm({...form, name, description});
      setCategory(category?.[0]?.id);
      setIsFacility(id);
      setLocalFile(photos?.[0]);
    }
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
  const [name, setName] = useState(data_getFacility?.name);
  const [category, setCategory] = useState(data_getFacility?.category?.[0]?.id);
  const [description, setDescription] = useState(data_getFacility?.description);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idFacility, setIsFacility] = useState({});

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
      typeof form?.name == 'string' &&
      typeof form?.description == 'string' &&
      typeof category == 'number' &&
      localFile &&
      form?.name.trim() !== '' &&
      form?.description.trim() !== ''
    ) {
      if (isEdited) {
        const token = await AsyncStorage.getItem('token');
        updateFacility(form)(facilitiesDispatch)({
          localFile,
          category,
          idRoom,
          idFacility,
          token,
        })(() => {
          navigate({
            name: MANAGING_ROOM_DETAILS,
            params: {
              id_building: idBuilding,
              name_building: nameBuilding,
              reload: true,
            },
            merge: true,
          });
          setForm({});
          setLocalFile('');
          setName('');
          setDescription('');
          setCategory('');
          setIsLoading(false);
        });
      } else {
        Announce(ANNOUNCE, DATA_HAS_NOT_CHANGED);
      }
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
                source={{
                  uri: localFile?.path
                    ? localFile?.path.replace('http://', 'https://')
                    : localFile.replace('http://', 'https://'),
                }}
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
          value={form.name}
          error={error?.errors?.name?.[0]}
        />

        <CustomInput
          label="Mô tả"
          onChangeText={value => {
            onChange({name: 'description', value});
            return setDescription(value);
          }}
          placeholder="Nhập mô tả thiết bị"
          value={form.description}
          error={error?.errors?.description?.[0]}
        />

        <SelectingDropDown
          title={data_getFacility?.category?.[0]?.name}
          data={data_categories}
          setState={setCategory}
          setIsEdited={setIsEdited}
        />

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
