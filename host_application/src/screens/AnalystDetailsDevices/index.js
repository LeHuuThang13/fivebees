import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import HeaderDetails from '../../components/common/HeaderDetails';
import Device from '../../components/common/Device';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import {
  ANALYST,
  CREATING_FACILITY,
  UPDATING_FACILITY,
  MANAGING_ROOMS,
} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import getFacilities from '../../context/actions/facilities/getFacilities';
import colors from '../../assets/themes/colors';
import DeviceAnalyst from '../../components/common/DeviceAnalyst';
import Pdf from '../../components/common/PrintAnalystDetailsDevices';

const ManagingRoomDetails = ({navigation, route}) => {
  const {navigate} = useNavigation();

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(ANALYST);
    },
  });

  const {
    facilitiesDispatch,
    facilitiesState: {
      getFacilities: {data, loading},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate(ANALYST);
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFacilities()(facilitiesDispatch);
    });
    return unsubscribe;
  }, [route]);

  //Hooks

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
    const {name, photos, room} = item;
    const category = item?.category?.[0]?.name;
    const status = item?.status?.[0]?.name;
    return (
      <DeviceAnalyst
        urlImage={{
          uri: photos?.[0] ? photos?.[0].replace('http://', 'https://') : '',
        }}
        title={`Sản phẩm`}
        name={`${name}`}
        amountTitle={'Loại '}
        amount={category}
        statusTitle={'Trạng Thái '}
        status={status}
        roomTitle={'Phòng'}
        room={room.length > 0 ? room.name : ' Không có'}
        style={{
          marginVertical: 12,
        }}
      />
    );
  };

  return (
    <View style={[styles.container, GlobalStyles.fullScreen]}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} />
      ) : (
        <>
          <View style={{paddingHorizontal: 15}}>
            <FlatList
              renderItem={renderItem}
              data={data}
              extraData={data}
              style={styles.FlatList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={listEmptyComponent}
            />
          </View>
          <Pdf
            titlePrint={'thiết bị'}
            colOne={'Số thiết bị'}
            colTwo={'Tên'}
            colThree={'Danh mục'}
            colFour={'Trạng thái'}
            data={data}
          />
        </>
      )}
    </View>
  );
};

export default ManagingRoomDetails;
