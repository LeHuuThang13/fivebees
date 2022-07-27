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
import {BuildingOptions} from '../../components/common/BuildingOptions/BuildingOptions';
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

const RoomList = ({navigation}) => {
  const [chooseBuilding, setChooseBuilding] = useState('Tòa A');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getRooms()(roomsDispatch);
  }, []);

  const {
    roomsDispatch,
    roomsState: {
      getRooms: {data, loading},
    },
  } = useContext(GlobalContext);

  const changeModelVisible = bool => {
    setIsModalVisible(bool);
  };

  const setData = option => {
    setChooseBuilding(option);
  };

  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: IconMenu,
    styles: {
      marginHorizontal: 10,
    },
  });

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
    const {id, description, building_id, room_number, status} = item;
    return (
      <View>
        <Room
          roomName={`Phòng ${room_number}`}
          status={status}
          totalDevices={10}
          totalBrokenDevices={0}
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
              {chooseBuilding}
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
          />
        </Modal>
      </View>

      {loading && <ActivityIndicator size="large" color={colors.secondary} />}

      {!loading && (
        <FlatList
          renderItem={renderItem}
          data={data.data}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </View>
  );
};

export default RoomList;
