import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import colors from '../../assets/themes/colors';
import Setting from '../../assets/icons/setting_white.svg';
import styles from './styles';
import Room from '../../components/common/Room';
import IconRoom from '../../assets/icons/room_outline.svg';

import IconMenu from '../../assets/icons/menu_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import {GlobalContext} from '../../context/Provider';
import getBuildings from '../../context/actions/buildings/getBuildings';
import {ROOM_LIST} from '../../constants/routeNames';

const BuildingsList = ({navigation}) => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: IconMenu,
    styles: {
      marginHorizontal: 10,
    },
  });

  const {
    buildingsDispatch,
    buildingsState: {
      getBuildings: {data: data_building, loading: loading_building},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    getBuildings()(buildingsDispatch);
  }, []);

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>Không có dữ liệu tòa nhà</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {name, rooms, id} = item;
    let roomsTotal;

    if (item !== '') {
      roomsTotal =
        rooms.length > 0
          ? rooms.reduce(function (total, curVal) {
              return (total += 1);
            }, 0)
          : 0;
      return (
        <Room
          roomName={`${name}`}
          IconDevice={IconRoom}
          IconSetting={Setting}
          totalDevices={roomsTotal}
          textTotalDevices={'Số lượng phòng:'}
          btnTitle={'Xem phòng'}
          onPress={() => {
            navigation.navigate(ROOM_LIST, {
              id_building: id,
            });
          }}
        />
      );
    }
  };

  return (
    <View style={{paddingHorizontal: 15}}>
      {/* Selecting options */}

      {loading_building ? (
        <ActivityIndicator size="large" color={colors.secondary} />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={data_building}
          style={styles.FlatList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </View>
  );
};

export default BuildingsList;
