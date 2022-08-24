import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import HeaderDetails from '../../components/common/HeaderDetails';
import Device from '../../components/common/Device';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import {
  CREATING_FACILITY,
  UPDATING_FACILITY,
  MANAGING_ROOMS,
  HOME_NAVIGATOR,
} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import getFacilitiesByIdRoom from '../../context/actions/facilities/getFacilitiesByIdRoom.js';
import colors from '../../assets/themes/colors';
import deleteFacilityById from '../../context/actions/facilities/deleteFacilityById';
import CustomCreatingButton from '../../components/CustomCreatingButton';

const ManagingRoomDetails = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const idRoom = route.params?.id_room;
  const idBuilding = route.params?.id_building;
  const nameBuilding = route.params?.name_building;

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      setIsLoaded(false);
      navigate({
        name: MANAGING_ROOMS,
        params: {
          id_building: idBuilding,
          name_building: nameBuilding,
        },
        merge: true,
      });
    },
  });

  const {
    facilitiesDispatch,
    facilitiesState: {
      getFacilitiesByIdRoom: {data, loading},
    },
  } = useContext(GlobalContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('123 321 123 321');
      setIsLoaded(false);
      navigate({
        name: MANAGING_ROOMS,
        params: {
          id_building: idBuilding,
          name_building: nameBuilding,
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
  }, [route.params]);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = navigation.addListener('focus', () => {
      getFacilitiesByIdRoom(idRoom)(facilitiesDispatch)(isMounted)(setIsLoaded);
    });
    return unsubscribe;
  }, [route.params]);

  //Functions

  const listEmptyComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>Không có dữ liệu thiết bị</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {code, name, id, photos} = item;

    const imgAlt =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';

    return (
      <Device
        urlImage={{
          uri: photos?.[0].replace('http://', 'https://'),
        }}
        title={`Sản phẩm`}
        name={`${name}`}
        amountTitle={'Mã thiết bị'}
        amount={code}
        style={{
          marginVertical: 12,
        }}
        DeleteIcon={<DeleteIcon />}
        EditIcon={<EditIcon />}
        onPressEdit={() => {
          setIsLoaded(false);
          navigate(UPDATING_FACILITY, {
            id_room: idRoom,
            id_building: idBuilding,
            name_building: nameBuilding,
            item: item,
            isFromManagingRoom: true,
          });
        }}
        onPressDelete={() => {
          deleteFacilityById(id)(facilitiesDispatch);
        }}
      />
    );
  };

  return (
    <View style={[GlobalStyles.fullScreen]}>
      {isLoaded ? (
        <>
          <CustomCreatingButton
            onPress={() => {
              navigate(CREATING_FACILITY, {
                isFromManagingRoom: true,
                id_room: idRoom,
                id_building: idBuilding,
                name_building: nameBuilding,
                isFromManagingRoom: true,
              });
            }}
          />

          <HeaderDetails
            textTitleOne={'Tình trạng'}
            contentTextTitleOne={'Đang sử dụng'}
            textTitleTwo={'Tổng thiết bị'}
            contentTextTitleTwo={data.length}
          />
          <View style={{paddingHorizontal: 15}}>
            <FlatList
              renderItem={renderItem}
              data={data}
              extraData={data}
              style={styles.FlatList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={listEmptyComponent}
            />
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color={colors.secondary} />
      )}
    </View>
  );
};

export default ManagingRoomDetails;
