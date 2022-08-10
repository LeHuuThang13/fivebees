import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image, FlatList, ActivityIndicator} from 'react-native';
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
import deleteFacilityById from '../../context/actions/facilities/deleteFacilityById';
import CustomCreatingButton from '../../components/CustomCreatingButton';
import DeviceAnalyst from '../../components/common/DeviceAnalyst';
import Pdf from '../../components/common/HtmlToPdf';

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
    const {category, name, photo, status, room} = item;

    return (
      <DeviceAnalyst
        urlImage={require('../../assets/images/tv_samsung.jpg')}
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
        <FlatList
          renderItem={renderItem}
          data={data}
          extraData={data}
          style={styles.FlatList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={listEmptyComponent}
        />
      )}
      <Pdf />
    </View>
  );
};

export default ManagingRoomDetails;
