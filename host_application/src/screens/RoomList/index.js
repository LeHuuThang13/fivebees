import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Container from '../../components/common/Container';
import {TouchableOpacity} from 'react-native';
import colors from '../../assets/themes/colors';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import BuildingOptions from '../../components/common/BuildingOptions/BuildingOptions';
import Device from '../../assets/icons/device.svg';
import Setting from '../../assets/icons/setting_white.svg';
import BrokenDevice from '../../assets/icons/broken.svg';
import styles from './styles';
import {ROOMDETAILS} from '../../constants/routeNames';
import Room from '../../components/common/Room';
import IconMenu from '../../assets/icons/menu_icon.svg';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import {GlobalContext} from '../../context/Provider';
import getRooms from '../../context/actions/rooms/getRooms';
import getBuildings from '../../context/actions/buildings/getBuildings';

const RoomList = ({navigation}) => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: IconMenu,
    styles: {
      marginHorizontal: 10,
    },
  });
  const [chooseBuilding, setChooseBuilding] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    roomsDispatch,
    roomsState: {
      getRooms: {data: data_rooms, loading: loading_rooms},
    },
    buildingsDispatch,
    buildingsState: {
      getBuildings: {data: data_building, loading: loading_building},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    getBuildings()(buildingsDispatch);
    getRooms()(roomsDispatch);
    console.log('ok');
  }, []);

  const changeModelVisible = bool => {
    setIsModalVisible(bool);
  };

  const setData = option => {
    setChooseBuilding(option);
  };

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>Không có phòng</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {id, description, building_id, room_number, status, facilities} =
      item;

    function countDamagedFacilities(total, curVal) {
      return curVal.status_id === 3 || curVal.status_id === undefined
        ? total++
        : total;
    }

    const damagedFacilities = facilities.reduce(countDamagedFacilities, 0);

    console.log(typeof damagedFacilities, damagedFacilities);

    return (
      <View>
        <Room
          roomName={`Phòng ${room_number}`}
          status={status}
          totalDevices={facilities.length}
          totalBrokenDevices={damagedFacilities}
          disabled={facilities.length > 0 ? false : true}
          IconDevice={Device}
          IconBrokenDevice={BrokenDevice}
          IconSetting={Setting}
          onPress={() => {
            navigation.navigate(ROOMDETAILS);
          }}
        />
      </View>
    );
  };

  return (
    <View style={{paddingHorizontal: 15}}>
      {/* Selecting options */}
      <View>
        <View style={[styles.selectOptionSection, styles.stylesText]}>
          <TouchableOpacity
            style={styles.opacityBtn}
            onPress={() => changeModelVisible(true)}>
            <Text style={[styles.textSelectColor, styles.stylesText]}>
              {chooseBuilding.length > 0 ? (
                chooseBuilding
              ) : data_building.length > 0 ? (
                data_building[0]['name']
              ) : (
                <ActivityIndicator size="small" color={colors.secondary} />
              )}
            </Text>
            <ArrowDown />
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          animationType="none"
          visible={isModalVisible}
          onRequestClose={() => changeModelVisible(false)}>
          <BuildingOptions
            changeModelVisible={changeModelVisible}
            setData={setData}
            buildings={data_building}
          />
        </Modal>
      </View>

      {loading_rooms && (
        <ActivityIndicator size="large" color={colors.secondary} />
      )}

      {!loading_rooms && (
        <FlatList
          renderItem={renderItem}
          data={data_rooms.data}
          style={styles.FlatList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </View>
  );
};

export default RoomList;
