import React, {useContext, useEffect} from 'react';
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
import {ANALYST} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import getBuildings from '../../context/actions/buildings/getBuildings';
import colors from '../../assets/themes/colors';
import DeviceAnalyst from '../../components/common/DeviceAnalyst';
import ExportPdf from '../../components/common/PrintAnalystBuildings';

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
    buildingsDispatch,
    buildingsState: {
      getBuildings: {data, loading},
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
      getBuildings()(buildingsDispatch);
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
    const {category, name, photos, status, hotline, address} = item;

    return (
      <DeviceAnalyst
        urlImage={{uri: photos[0]}}
        title={`Tòa: `}
        name={`${name}`}
        amountTitle={'Địa chỉ: '}
        amount={address}
        roomTitle={'Hotline: '}
        room={`${hotline}`}
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
          <FlatList
            renderItem={renderItem}
            data={data}
            extraData={data}
            style={styles.FlatList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={listEmptyComponent}
          />
          <ExportPdf data={data} />
        </>
      )}
    </View>
  );
};

export default ManagingRoomDetails;
