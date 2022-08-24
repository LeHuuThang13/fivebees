import MenuIcon from '../../assets/icons/menu_icon.svg';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Text,
  View,
} from 'react-native';
import colors from '../../assets/themes/colors';
import styles from './styles';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import {GlobalContext} from '../../context/Provider';
import RoomPrintPdf from '../../components/common/RoomPrintPdf';
import DeviceIcon from '../../assets/icons/device.svg';
import SettingIcon from '../../assets/icons/setting_white.svg';
import getMultipleApiRooms from '../../context/actions/rooms/getMultipleApiRooms';
import {BUILDINGS_LIST, ROOMDETAILS} from '../../constants/routeNames';
import getRooms from '../../context/actions/rooms/getRooms';
import ExportPdf from '../../components/common/PrintAnalystRooms';

const Introduce = ({navigation, route}) => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: MenuIcon,
    styles: {
      marginHorizontal: 10,
    },
  });
  const {
    roomsDispatch,
    roomsState: {
      getRooms: {data: data_rooms, loading: loading_room},
    },
  } = useContext(GlobalContext);

  console.log('data_rooms', data_rooms);

  //Hooks

  async function fetchData(isMounted) {
    getRooms()(roomsDispatch)(isMounted);
  }

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate(BUILDINGS_LIST);
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, [navigation]);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(isMounted);
    });
    return () => {
      unsubscribe, (isMounted = false);
    };
  }, [route.params]);

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Text>Không có dữ liệu phòng</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {building_id, description, id, room_number, status, facilities} =
      item;

    return (
      <RoomPrintPdf
        roomName={`Phòng ${room_number}`}
        status={status}
        textTotalDevices={'Tổng thiết bị: '}
        totalDevices={facilities ? facilities.length : 0}
        IconDevice={DeviceIcon}
        IconSetting={SettingIcon}
        data={item}
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

export default Introduce;
