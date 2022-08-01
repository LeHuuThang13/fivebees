import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import colors from '../../assets/themes/colors';
import styles from './styles';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import {GlobalContext} from '../../context/Provider';
import getBuildings from '../../context/actions/buildings/getBuildings';
const RoomList = ({navigation, route}) => {
  const {idBuilding} = route.params;

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtn: () => {
      navigation.goBack();
    },
  });

  const {
    buildingsDispatch,
    buildingsState: {
      getBuildings: {data: data_building, loading: loading_building},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    getBuildings(idBuilding)(buildingsDispatch);
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
    console.log(item);
    item = item[0].rooms;
    const Room = item.map(item => {
      const {room_number, facilities, status} = item;
      function countDamagedFacilities(total, curVal) {
        return curVal.status_id === 3 || curVal.status_id === undefined
          ? total++
          : total;
      }

      // const damagedFacilities = facilities.reduce(countDamagedFacilities, 0);

      // return (
      //   <Room
      //     roomName={`Phòng ${room_number}`}
      //     status={status}
      //     // totalDevices={facilities.length}
      //     // totalBrokenDevices={damagedFacilities}
      //     disabled={facilities.length > 0 ? false : true}
      //     IconDevice={Device}
      //     IconBrokenDevice={BrokenDevice}
      //     IconSetting={Setting}
      //     onPress={() => {
      //       navigation.navigate(ROOMDETAILS);
      //     }}
      //   />
      // );
    });

    return Room;
  };
  return (
    <View style={{paddingHorizontal: 15}}>
      {/* Selecting options */}

      {Object.keys(data_building).length > 0 ? (
        <FlatList
          renderItem={renderItem}
          data={[data_building]}
          extraData={data_building}
          style={styles.FlatList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      ) : (
        <ActivityIndicator size="large" color={colors.secondary} />
      )}
    </View>
  );
};

export default RoomList;
