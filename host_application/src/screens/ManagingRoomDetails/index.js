import React, {useContext, useEffect, useState} from 'react';
import {Text, View, ScrollView, Image, FlatList} from 'react-native';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import HeaderDetails from '../../components/common/HeaderDetails';
import Device from '../../components/common/Device';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import {EDITING_DEVICE, MANAGING_ROOMS} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import getFacilitiesByIdRoom from '../../context/actions/facilities/getFacilitiesByIdRoom.js';

const ManagingRoomDetails = ({navigation, route}) => {
  const {navigate} = useNavigation();
  const idRoom = route.params?.id_room;
  const idBuilding = route.params?.id_building;

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGING_ROOMS, {
        id_building: idBuilding,
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
  }, [idRoom]);

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
    const {id, room_number, status} = item;
    return (
      // <Device
      //       urlImage={require('../../assets/images/tv_samsung.jpg')}
      //       title={'Sản phẩm'}
      //       name={'Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU8000KXXV/'}
      //       amountTitle={'Số lượng'}
      //       amount={2}
      //       style={{
      //         marginVertical: 12,
      //       }}
      //       DeleteIcon={<DeleteIcon />}
      //       EditIcon={<EditIcon />}
      //       onPressEdit={() => {
      //         navigation.navigate(EDITING_DEVICE);
      //       }}
      //       onPressDelete={() => {
      //         console.log('hello');
      //       }}
      //     />
      <></>
    );
  };

  console.log(!isLoading ? data.facilities : initialState);
  console.log(data.facilities);

  return (
    <View style={[styles.container, GlobalStyles.fullScreen]}>
      <HeaderDetails
        textTitleOne={'Tình trạng'}
        contentTextTitleOne={'Đang sử dụng'}
        textTitleTwo={'Tổng thiết bị'}
        contentTextTitleTwo={10}
        textTitleThree={'Thiết bị hư hỏng'}
        contentTextTitleThree={0}
      />
      <FlatList
        renderItem={renderItem}
        data={!isLoading ? data.facilities : initialState}
        extraData={data.facilities}
        style={styles.FlatList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};

export default ManagingRoomDetails;
