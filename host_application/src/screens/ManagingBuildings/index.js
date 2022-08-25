import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  ScrollView,
  View,
  Text,
} from 'react-native';
import GlobalStyles from '../../../GlobalStyles';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import ManagingContainer from '../../components/common/Managing';
import {
  CREATING_BUILDING,
  MANAGE,
  MANAGING_ROOMS,
  UPDATING_BUILDING,
} from '../../constants/routeNames';
import CustomCreatingButton from '../../components/CustomCreatingButton';
// Sgv Icons
import Room from '../../assets/icons/room_outline.svg';
import Setting from '../../assets/icons/setting_white.svg';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import getBuildings from '../../context/actions/buildings/getBuildings';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/themes/colors';
import {useNavigation} from '@react-navigation/native';
import MorePopupMenu from '../../components/common/MorePopupMenu';
import deleteBuilding from '../../context/actions/buildings/deleteBuilding';

const ManagingBuilding = ({navigation, route}) => {
  const {navigate} = useNavigation();

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigate(MANAGE);
      setIsLoaded(false);
    },
  });

  const {
    buildingsDispatch,
    buildingsState: {
      getBuildings: {data: data_building, loading: loading_building},
    },
  } = useContext(GlobalContext);

  const [isloaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Back button real device
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('Quay lại');
      navigation.navigate(MANAGE);
      setIsLoaded(false);
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return false;
      });
    };
  }, [route.params]);

  useEffect(() => {
    getBuildings(setIsLoaded)(buildingsDispatch);
  }, [route.params]);

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>Không có dữ liệu tòa nhà</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {name, rooms, id} = item;
    let roomsTotal;
    if (item) {
      roomsTotal =
        rooms.length > 0
          ? rooms.reduce(function (total, curVal) {
              return (total += 1);
            }, 0)
          : 0;
      const LIMIT_ROOM = 0;

      return (
        <ManagingContainer
          MoreActions={
            <MorePopupMenu
              styles={{
                position: 'absolute',
                top: 10,
                right: 0,
                zIndex: 3,
              }}
              onPressEdit={() => {
                setIsLoaded(false);
                navigate(UPDATING_BUILDING, {
                  building: item,
                });
              }}
              onPressDelete={() => {
                deleteBuilding(id)(buildingsDispatch);
              }}
              actionNameEdit={'Chỉnh sửa'}
              actionNameDelete={'Xóa'}
            />
          }
          managingName={`${name}`}
          totalDevices={roomsTotal}
          totalManagingTitleText={'Tổng số phòng'}
          totalManagingContentText={roomsTotal}
          onPress={() => {
            setIsLoaded(false);
            navigate(MANAGING_ROOMS, {
              id_building: id,
              name_building: name,
            });
          }}
          disabled={roomsTotal > LIMIT_ROOM ? true : false}
          IconManagingText={<Room />}
          //buttons title
          IconManagingBtn={<Setting />}
          managingBtnText={'Quản lý phòng'}
        />
      );
    }
  };

  return (
    <>
      {isloaded ? (
        <View style={[{flex: 1}]}>
          {loading_building ? (
            <ActivityIndicator size="large" color={colors.secondary} />
          ) : (
            <>
              <CustomCreatingButton
                onPress={() => {
                  navigate(CREATING_BUILDING);
                }}
              />
              <View style={GlobalStyles.paddingContainer}>
                <FlatList
                  renderItem={renderItem}
                  data={data_building}
                  extraData={data_building}
                  style={styles.FlatList}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={ListEmptyComponent}
                />
              </View>
            </>
          )}
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default ManagingBuilding;
