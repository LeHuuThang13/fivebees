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
import {
  MANAGING_FACILITIES,
  MANAGING_ROOM_DETAILS,
} from '../../constants/routeNames';
import updateFacility from '../../context/actions/facilities/updateFacility';
import SelectingDropDown from '../../components/common/SelectDropdown';
import getStatus from '../../context/actions/status/getStatus';

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
  } = useContext(GlobalContext);

  // Hook fields

  useEffect(() => {
    // Back button real device
    getCategories()(categoriesDispatch);
    getStatus()(statusDispatch);
    if (item) {
      const {name, description, category_id, id} = item;
      setForm({...form, name, description});
      setCategory(category_id);
      setIsFacility(id);
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate(MANAGING_ROOMS);
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, [route]);

  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState(item?.photos[0]);
  const sheetRef = useRef(null);
  const [name, setName] = useState(form?.name);
  const [category, setCategory] = useState({});
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

  const onSubmit = () => {
    if (name || localFile || description || category) {
      updateFacility(form)(facilitiesDispatch)({
        localFile,
        category,
        idFacility,
      })(() => {
        navigate(MANAGING_FACILITIES);
        setForm({});
        setLocalFile('');
        setName('');
        setDescription('');
        setCategory('');
        setIsLoading(false);
      });
    } else {
      Alert.alert('Thông báo', 'Bạn có bất kỳ thay đổi nào!', [
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
          title={'Loại thiết bị'}
          data={data_categories}
          setState={setCategory}
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
