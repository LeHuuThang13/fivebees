import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import colors from '../../assets/themes/colors';
import styles from './styles';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import {GlobalContext} from '../../context/Provider';
import Room from '../../components/common/Room';
import DeviceIcon from '../../assets/icons/device.svg';
import BrokenIcon from '../../assets/icons/broken.svg';
import SettingIcon from '../../assets/icons/setting_white.svg';
import getMultipleApiRooms from '../../context/actions/rooms/getMultipleApiRooms';
import {BUILDINGS_LIST, ROOMDETAILS} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';

const RoomsList = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const {id_building: idBuilding} = route.params;

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigation.goBack();
    },
  });

  const {
    roomsDispatch,
    roomsState: {
      getRooms: {data: data_rooms, loading: loading_room},
    },
  } = useContext(GlobalContext);

  //Hooks
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    getMultipleApiRooms(idBuilding)(roomsDispatch)(setIsLoading);
  }

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [route]);

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text>Không có dữ liệu tòa nhà</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {building_id, description, id, room_number, status, facilities} =
      item;

    return (
      <Room
        roomName={`Phòng ${room_number}`}
        status={status}
        textTotalDevices={'Tổng thiết bị: '}
        totalDevices={facilities ? facilities.length : 0}
        IconDevice={DeviceIcon}
        IconSetting={SettingIcon}
        btnTitle={'Xem thiết bị'}
        onPress={() => {
          navigation.navigate(ROOMDETAILS, {
            building_id: building_id,
            items: facilities,
            id_building: idBuilding,
          });
        }}
      />
    );
  };
  return (
    <View style={{paddingHorizontal: 15, flex: 1}}>
      {/* Selecting options */}

      {loading_room ? (
        <ActivityIndicator size="large" color={colors.secondary} />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={data_rooms}
          style={styles.FlatList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </View>
  );
};

export default RoomsList;