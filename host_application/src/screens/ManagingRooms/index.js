import React, {useContext, useEffect, useState} from 'react';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {
  CREATING_ROOM,
  MANAGING_BUILDING,
  MANAGING_ROOM_DETAILS,
  UPDATING_ROOM,
} from '../../constants/routeNames';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import DeviceIcon from '../../assets/icons/device.svg';
import BrokenIcon from '../../assets/icons/broken.svg';
import Room from '../../components/common/Room';
import CustomCreatingButton from '../../components/CustomCreatingButton';
import CustomHeaderDetails from '../../components/CustomHeaderDetails';
import Setting from '../../assets/icons/setting_white.svg';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import getRoomsByIdBuilding from '../../context/actions/rooms/getRoomsByIdBuilding';
import MorePopupMenu from '../../components/common/MorePopupMenu';
import deleteRoomById from '../../context/actions/rooms/deleteRoomById';
import colors from '../../assets/themes/colors';
import {Toast} from '../../components/Toast';

const ManagingRooms = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const idBuilding = route.params?.id_building;
  const nameBuilding = route.params?.name_building;

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_BUILDING);
      setIsLoaded(false);
    },
  });

  const {
    roomsDispatch,
    roomsState: {
      getRooms: {data: data_rooms, loading: loading_rooms},
    },
  } = useContext(GlobalContext);

  const [isloaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      setIsLoaded(false);
      navigate({
        name: MANAGING_BUILDING,
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
  }, [route]);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = navigation.addListener('focus', () => {
      getRoomsByIdBuilding(idBuilding)(roomsDispatch)({setIsLoaded, isMounted});
    });
    return unsubscribe;
  }, [idBuilding]);

  //Functions

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
    const {id, room_number, status} = item;
    return (
      <Room
        roomName={`Phòng ${room_number}`}
        status={status}
        totalDevices={`Thiết bị đang cập nhập`}
        IconDevice={DeviceIcon}
        btnTitle={'Quản lý thiết bị'}
        IconSetting={Setting}
        onPress={() => {
          navigation.navigate(MANAGING_ROOM_DETAILS, {
            id_room: id,
            id_building: idBuilding,
            name_building: nameBuilding,
            rooms: item,
          });
          setIsLoaded(false);
        }}
        MoreActions={
          <MorePopupMenu
            styles={{
              position: 'absolute',
              top: 10,
              right: 0,
              zIndex: 3,
            }}
            onPressEdit={() => {
              setIsLoaded(false);
              navigation.navigate(UPDATING_ROOM, {
                room: item,
                id_room: id,
                id_building: idBuilding,
                name_building: nameBuilding,
              });
            }}
            onPressDelete={() => {
              deleteRoomById(id)(roomsDispatch);
            }}
            actionNameEdit={'Chỉnh sửa'}
            actionNameDelete={'Xóa'}
          />
        }
      />
    );
  };

  return (
    <>
      {isloaded ? (
        <View style={styles.container}>
          <CustomCreatingButton
            onPress={() => {
              setIsLoaded(false);
              navigation.navigate(CREATING_ROOM, {
                id_building: idBuilding,
                name_building: nameBuilding,
              });
            }}
          />
          <CustomHeaderDetails
            firstText={`Tòa nhà: ${
              nameBuilding ? nameBuilding : 'Đang cập nhập'
            }`}
            secondText={`Tổng số phòng: ${
              data_rooms ? data_rooms.length : 'Đang cập nhập'
            }`}
          />
          <View style={styles.body}>
            <View style={GlobalStyles.paddingContainer}>
              <FlatList
                renderItem={renderItem}
                data={data_rooms}
                extraData={data_rooms}
                style={styles.FlatList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={listEmptyComponent}
              />
            </View>
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" color={colors.secondary} />
      )}
    </>
  );
};

export default ManagingRooms;
