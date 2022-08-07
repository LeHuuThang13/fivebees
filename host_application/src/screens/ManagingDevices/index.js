import React, {useContext, useEffect, useState} from 'react';
import Container from '../../components/common/Container';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import PreviousIcon from '../../assets/icons/previous_icon.svg';
import {CREATING_MANAGING_FACILITY, MANAGE} from '../../constants/routeNames';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import CustomCreatingButton from '../../components/CustomCreatingButton';
import colors from '../../assets/themes/colors';
import getFacilities from '../../context/actions/facilities/getFacilities';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import Device from '../../components/common/Device';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import deleteFacilityById from '../../context/actions/facilities/deleteFacilityById';
import {useNavigation} from '@react-navigation/native';

const ManagingDevices = ({navigation, route}) => {
  const {navigate} = useNavigation();

  SettingHeaderNavigator.settingChildHeaderNavigator({
    Icon: PreviousIcon,
    styles: {
      marginHorizontal: 10,
    },
    onPressBtnLeft: () => {
      navigation.navigate(MANAGE);
    },
  });

  const {
    facilitiesDispatch,
    facilitiesState: {
      getFacilities: {data, loading},
    },
  } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = navigation.addListener('focus', () => {
      getFacilities()(facilitiesDispatch);
    });
    return unsubscribe;
  }, [route]);

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

  console.log(data);

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
        DeleteIcon={<DeleteIcon />}
        EditIcon={<EditIcon />}
        onPressEdit={() => {
          navigation.navigate(UPDATING_FACILITY, {
            id_room: idRoom,
            id_building: idBuilding,
            name_building: nameBuilding,
            item: item,
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
          navigate(CREATING_MANAGING_FACILITY);
        }}
      />
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
    </View>
  );
};

export default ManagingDevices;
