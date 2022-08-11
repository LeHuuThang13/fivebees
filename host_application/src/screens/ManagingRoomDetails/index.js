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
  CREATING_FACILITY,
  UPDATING_FACILITY,
  MANAGING_ROOMS,
} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import getFacilitiesByIdRoom from '../../context/actions/facilities/getFacilitiesByIdRoom.js';
import colors from '../../assets/themes/colors';
import deleteFacilityById from '../../context/actions/facilities/deleteFacilityById';
import CustomCreatingButton from '../../components/CustomCreatingButton';

const ManagingRoomDetails = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const idRoom = route.params?.id_room;
  const idBuilding = route.params?.id_building;
  const nameBuilding = route.params?.name_building;

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_ROOMS, {
        id_building: idBuilding,
        name_building: nameBuilding,
      });
    },
  });

  const {
    facilitiesDispatch,
    facilitiesState: {
      getFacilities: {data, loading},
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(true);
    getFacilitiesByIdRoom(idRoom)(facilitiesDispatch)(setIsLoading);
    const unsubscribe = navigation.addListener('focus', () => {
      getFacilitiesByIdRoom(idRoom)(facilitiesDispatch);
    });
    return unsubscribe;
  }, [route]);

  //Hooks
  const [initialState, setInitialState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const {status_id: status, name, category_id: category, id} = item;

    return (
      <Device
        urlImage={require('../../assets/images/tv_samsung.jpg')}
        title={`Sản phẩm`}
        name={`${name}`}
        amountTitle={'Số lượng'}
        amount={'Đang cập nhập'}
        style={{
          marginVertical: 12,
        }}
        DeleteIcon={<DeleteIcon />}
        EditIcon={<EditIcon />}
        onPressEdit={() => {
          navigate(UPDATING_FACILITY, {
            id_room: idRoom,
            id_building: idBuilding,
            name_building: nameBuilding,
            item: item,
            isFromManagingRoom: true,
          });
        }}
        onPressDelete={() => {
          deleteFacilityById(id)(facilitiesDispatch);
        }}
      />
    );
  };

  return (
    <View style={[styles.container, GlobalStyles.fullScreen]}>
      <CustomCreatingButton
        onPress={() => {
          navigate(CREATING_FACILITY, {
            isFromManagingRoom: true,
            id_room: idRoom,
            id_building: idBuilding,
            name_building: nameBuilding,
            isFromManagingRoom: true,
          });
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} />
      ) : (
        <>
          <HeaderDetails
            textTitleOne={'Tình trạng'}
            contentTextTitleOne={'Đang sử dụng'}
            textTitleTwo={'Tổng thiết bị'}
            contentTextTitleTwo={
              data?.facilities ? data.facilities.length : 'Đang cập nhập'
            }
            textTitleThree={'Thiết bị hư hỏng'}
            contentTextTitleThree={0}
          />
          <FlatList
            renderItem={renderItem}
            data={!isLoading ? data.facilities : []}
            extraData={data.facilities}
            style={styles.FlatList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={listEmptyComponent}
          />
        </>
      )}
    </View>
  );
};

export default ManagingRoomDetails;
