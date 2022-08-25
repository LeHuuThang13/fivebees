import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import HeaderDetails from '../../components/common/HeaderDetails';
import {ROOM_LIST} from '../../constants/routeNames';
import Device from '../../components/common/Device';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import getFacilitiesByIdRoom from '../../context/actions/facilities/getFacilitiesByIdRoom';
import {GlobalContext} from '../../context/Provider';

const RoomDetails = ({navigation, route}) => {
  const {items, id_building, id_room} = route.params;

  const {
    facilitiesDispatch,
    facilitiesState: {
      getFacilitiesByIdRoom: {data, loading},
    },
  } = useContext(GlobalContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = navigation.addListener('focus', () => {
      getFacilitiesByIdRoom(id_room)(facilitiesDispatch)(isMounted)(
        setIsLoaded,
      );
    });
    return unsubscribe;
  }, [route.params]);

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate({
        name: ROOM_LIST,
        params: {
          id_building: id_building,
        },
        merge: true,
      });
      setIsLoaded(false);
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, []);

  SettingHeaderNavigator.settingChildHeaderBackToHomeNavigator({
    Icon: PreviousIcon,
    previousBtn: () => {
      setIsLoaded(false);
      navigation.navigate({
        name: ROOM_LIST,
        params: {
          id_building: id_building,
        },
        merge: true,
      });
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

  const renderItem = ({item}) => {
    const {code, name, id, photos, status} = item;

    return (
      <Device
        urlImage={{
          uri: photos?.[0] ? photos?.[0].replace('http://', 'https://') : '',
        }}
        title={`Sản phẩm`}
        name={`${name}`}
        amountTitle={'Mã thiết bị'}
        amount={code}
        titleOne={'Trạng thái'}
        textOne={status?.[0]?.name}
        style={{
          marginVertical: 12,
        }}
      />
    );
  };

  return (
    <View style={[styles.container, GlobalStyles.fullScreen]}>
      <HeaderDetails
        textTitleOne={'Tình trạng'}
        contentTextTitleOne={'Đang sử dụng'}
        textTitleTwo={'Tổng thiết bị'}
        contentTextTitleTwo={data.length}
      />
      <View style={{paddingHorizontal: 15, flex: 1}}>
        {/* Selecting options */}

        {isLoaded ? (
          <FlatList
            renderItem={renderItem}
            data={data}
            style={styles.FlatList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={listEmptyComponent}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
};

export default RoomDetails;
