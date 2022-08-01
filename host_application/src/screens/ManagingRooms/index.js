import React, {useContext, useEffect, useState} from 'react';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {
  CREATING_ROOM,
  MANAGING_BUILDING,
  MANAGING_ROOM_DETAILS,
  ROOMDETAILS,
} from '../../constants/routeNames';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
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

const ManagingRooms = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const {id_building: id} = route.params;

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_BUILDING);
    },
  });

  const {
    roomsDispatch,
    roomsState: {
      getRooms: {data: data_rooms, loading: loading_rooms},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(true);
    getRoomsByIdBuilding(id)(roomsDispatch)(setIsLoading);
    const unsubscribe = navigation.addListener('focus', () => {
      getRoomsByIdBuilding(id)(roomsDispatch);
    });
    return unsubscribe;
  }, [id]);

  //Hooks
  const [initialState, setInitialState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        totalBrokenDevices={'Thiết bị hư hỏng Đang cập nhập'}
        IconDevice={DeviceIcon}
        IconBrokenDevice={BrokenIcon}
        btnTitle={'Quản lý thiết bị'}
        IconSetting={Setting}
        onPress={() => {
          navigation.navigate(MANAGING_ROOM_DETAILS);
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
              console.log('edit');
            }}
            onPressDelete={() => {
              deleteBuilding(id)(buildingsDispatch);
            }}
            actionNameEdit={'Chỉnh sửa'}
            actionNameDelete={'Xóa'}
          />
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomCreatingButton
        onPress={() => {
          // navigation.navigate(CREATING_ROOM,{});
        }}
      />
      <CustomHeaderDetails
        firstText={`Tòa nhà: ${
          data_rooms?.name ? data_rooms?.name : 'Đang cập nhập'
        }`}
        secondText={`Tổng số phòng: ${
          data_rooms?.rooms ? data_rooms.rooms.length : 'Đang cập nhập'
        }`}
      />
      <View style={styles.body}>
        <View style={GlobalStyles.paddingContainer}>
          <FlatList
            renderItem={renderItem}
            data={!isLoading ? data_rooms.rooms : initialState}
            extraData={data_rooms.rooms}
            style={styles.FlatList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={listEmptyComponent}
          />
        </View>
      </View>
    </View>
  );
};

export default ManagingRooms;
