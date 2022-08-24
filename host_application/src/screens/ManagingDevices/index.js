import React, {useContext, useEffect, useState} from 'react';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {
  CREATING_MANAGING_FACILITY,
  MANAGE,
  UPDATING_DEVICE,
  UPDATING_FACILITY,
} from '../../constants/routeNames';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Text,
  View,
} from 'react-native';
import CustomCreatingButton from '../../components/CustomCreatingButton';
import colors from '../../assets/themes/colors';
import getFacilities from '../../context/actions/facilities/getFacilities';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import Device from '../../components/common/Device';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import deleteFacilityById from '../../context/actions/facilities/deleteFacilityById';
import {useNavigation} from '@react-navigation/native';
import deleteDeviceById from '../../context/actions/facilities/deleteDeviceById';

const ManagingDevices = ({navigation, route}) => {
  const {navigate} = useNavigation();

  console.log(route.params);

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigation.navigate(MANAGE);
    },
  });

  const {
    facilitiesDispatch,
    facilitiesState: {
      getFacilities: {data, loading},
    },
  } = useContext(GlobalContext);

  const [isloaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFacilities(setIsLoaded)(facilitiesDispatch);
    });
    return unsubscribe;
  }, [route]);

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      setIsLoaded(false);
      console.log('Dang an day nay');
      navigation.navigate(MANAGE);
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, [route.params]);

  const listEmptyComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>Không có dữ liệu phòng</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {status, name, id, photos} = item;
    const {name: status_name} = status[0];
    const imgLink = photos?.[0]
      ? photos?.[0].replace('http://', 'https://')
      : '';
    const imgAlt =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';

    return (
      <Device
        urlImage={{
          uri: imgLink,
        }}
        title={`Sản phẩm`}
        name={`${name}`}
        amountTitle={'Trạng thái'}
        amount={status_name}
        style={{
          marginVertical: 12,
        }}
        DeleteIcon={<DeleteIcon />}
        EditIcon={<EditIcon />}
        onPressEdit={() => {
          navigate(UPDATING_DEVICE, {
            item: item,
          });
        }}
        onPressDelete={() => {
          deleteDeviceById(id)(facilitiesDispatch);
        }}
      />
    );
  };

  return (
    <>
      {isloaded ? (
        <View style={[styles.container, GlobalStyles.fullScreen]}>
          <CustomCreatingButton
            onPress={() => {
              navigate(CREATING_MANAGING_FACILITY);
            }}
          />
          {loading ? (
            <ActivityIndicator size="large" color={colors.secondary} />
          ) : (
            <FlatList
              renderItem={renderItem}
              data={data}
              extraData={data}
              style={styles.FlatList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={listEmptyComponent}
            />
          )}
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default ManagingDevices;
