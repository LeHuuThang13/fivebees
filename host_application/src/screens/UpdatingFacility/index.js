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

const CreatingFacility = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const {
    id_room: idRoom,
    id_building: idBuilding,
    name_building: nameBuilding,
    item: item,
  } = route.params;

  //Setting header
  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    IconRight: CheckIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_ROOM_DETAILS, {
        id_room: idRoom,
        id_building: idBuilding,
        name_building: nameBuilding,
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

  useEffect(() => {
    // Back button real device
    getCategories()(categoriesDispatch);
    if (item) {
      const {name, description, category_id, id} = item;
      setForm({...form, name, description});
      setCategory(category_id);
      setIsFacility(id);
    }
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigate(MANAGING_ROOM_DETAILS, {
        id_room: idRoom,
        id_building: idBuilding,
        name_building: nameBuilding,
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
    if (isEdited) {
      updateFacility(form)(facilitiesDispatch)({
        localFile,
        category,
        idRoom,
        idFacility,
      })(() => {
        navigate(MANAGING_ROOM_DETAILS, {
          id_building: id,
        });
        setForm({});
        setLocalFile('');
        setName('');
        setDescription('');
        setCategory('');
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
          value={form.name}
          error={name === '' && error?.errors?.name?.[0]}
        />

        <CustomInput
          label="Mô tả"
          onChangeText={value => {
            onChange({name: 'description', value});
            return setDescription(value);
          }}
          placeholder="Nhập mô tả thiết bị"
          value={form.description}
          error={description === '' && error?.errors?.description?.[0]}
        />

        <SelectingDropDown
          title="Loại thiết bị"
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
