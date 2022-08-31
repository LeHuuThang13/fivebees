import React, {useContext, useEffect, useState} from 'react';
import {Text, View, ScrollView, Image, FlatList} from 'react-native';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import styles from './styles';
import GlobalStyles from '../../../globalStyles';
import HeaderDetails from '../../components/commons/HeaderDetails';
import Device from '../../components/commons/Device';
import IconMenu from '../../assets/icons/menu_icon.svg';
import {GlobalContext} from '../../context/Provider';
import getFacilities from '../../context/actions/facilities/getFacilities';

const RoomDetails = ({navigation, route}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: IconMenu,
    styles: {
      marginHorizontal: 10,
    },
  });

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

  const {
    roomDispatch,
    roomState: {data, loading},
    facilitiesDispatch,
    facilitiesState: {data: data_facilities, loading: loading_facilities},
  } = useContext(GlobalContext);

  useEffect(() => {
    let isMounted = true;
    getFacilities(data.id)(facilitiesDispatch)(isMounted)(setIsLoaded);
    const unsubscribe = navigation.addListener('focus', () => {
      getFacilities(data.id)(facilitiesDispatch)(isMounted)(setIsLoaded);
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item}) => {
    const {status_id: status, name, category_id: category, id, photos} = item;

    const {room_number: room} = item.room?.[0];

    console.log('room :>>>>>', room);

    return (
      <Device
        urlImage={{
          uri: photos?.[0] ? photos?.[0].replace('http://', 'https://') : '',
        }}
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

  console.log('data_facilities', data_facilities?.[0]?.room);
  return (
    <View style={[styles.container, GlobalStyles.fullScreen, {flex: 1}]}>
      <HeaderDetails
        textTitleOne={'Tên phòng'}
        contentTextTitleOne={data_facilities?.[0]?.room?.[0].room_number}
        textTitleTwo={'Tình trạng'}
        contentTextTitleTwo={data_facilities?.[0]?.room?.[0].status}
        textTitleFour={'Tổng thiết bị'}
        contentTextTitleFour={data_facilities.length}
      />
      <View style={{paddingHorizontal: 15, flex: 1}}>
        {/* Selecting options */}
        <FlatList
          renderItem={renderItem}
          data={data_facilities}
          style={styles.FlatList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={listEmptyComponent}
        />
      </View>
    </View>
  );
};

export default RoomDetails;
