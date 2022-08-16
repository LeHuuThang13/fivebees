import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Image, FlatList} from 'react-native';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import styles from './styles';
import GlobalStyles from '../../../globalStyles';
import HeaderDetails from '../../components/commons/HeaderDetails';
import {ROOM_LIST} from '../../constants/routeNames';
import Device from '../../components/commons/Device';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';

const RoomDetails = ({navigation, route}) => {
  const [idRoom, setIdRoom] = useState({});

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

  const getIdRoom = async () => {
    try {
      idRoom = await AsyncStorage.getItem('id_room');
      const idRoomApi = JSON.parse(idRoom);
      setIdRoom(idRoomApi);
    } catch (err) {}
  };

  useEffect(() => {
    getIdRoom();
    console.log('setIdRoom', setIdRoom);
  }, []);

  const renderItem = ({item}) => {
    const {status_id: status, name, category_id: category, id} = item;

    return (
      <Device
        urlImage={require('../../assets/images/tv_samsung.jpg')}
        title={`Sản phẩm`}
        name={`${name}`}
        amountTitle={'Số lượng'}
        amount={'1'}
        style={{
          marginVertical: 12,
        }}
      />
    );
  };

  return (
    <View style={[styles.container, GlobalStyles.fullScreen]}>
      {/* <HeaderDetails
        textTitleOne={'Tình trạng'}
        contentTextTitleOne={'Đang sử dụng'}
        textTitleTwo={'Tổng thiết bị'}
        contentTextTitleTwo={items.length}
      /> */}
      <View style={{paddingHorizontal: 15, flex: 1}}>
        {/* Selecting options */}
        <FlatList
          // renderItem={renderItem}
          data={[]}
          style={styles.FlatList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={listEmptyComponent}
        />
      </View>
    </View>
  );
};

export default RoomDetails;
