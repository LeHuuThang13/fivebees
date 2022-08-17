import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  BackHandler,
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

const RoomDetails = ({navigation, route}) => {
  const {items, id_building} = route.params;

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigate({
        name: ROOM_LIST,
        params: {
          id_building: id_building,
        },
        merge: true,
      });
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
      navigation.navigate(ROOM_LIST, {
        id_building: id_building,
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
    const {status_id: status, name, category_id: category, id, photos} = item;

    return (
      <Device
        urlImage={{}}
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
      <HeaderDetails
        textTitleOne={'Tình trạng'}
        contentTextTitleOne={'Đang sử dụng'}
        textTitleTwo={'Tổng thiết bị'}
        contentTextTitleTwo={items.length}
      />
      <View style={{paddingHorizontal: 15, flex: 1}}>
        {/* Selecting options */}

        <FlatList
          renderItem={renderItem}
          data={items}
          style={styles.FlatList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={listEmptyComponent}
        />
      </View>
    </View>
  );
};

export default RoomDetails;
