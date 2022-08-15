import React, {useEffect, useState} from 'react';
import Container from '../../components/common/Container';
//icons
import MenuIcon from '../../assets/icons/menu_icon.svg';
import BuildingIcon from '../../assets/icons/building.svg';
import Setting from '../../assets/icons/setting_white.svg';
import DeviceIcon from '../../assets/icons/device.svg';
//constants
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';
import ManagingContainer from '../../components/common/Managing';
import {
  MANAGING_BUILDING,
  MANAGING_FACILITIES,
} from '../../constants/routeNames';
import axiosInstance from '../../helpers/axiosInterceptor';
import axios from 'axios';
import MorePopupMenu from '../../components/common/MorePopupMenu';

const Managing = ({navigation}) => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: MenuIcon,
    styles: {
      marginHorizontal: 10,
    },
  });

  const [buildings, setBuilding] = useState({});
  const [facilities, setFacilities] = useState({});

  //Api
  const fetchData = () => {
    const buildingsApi = axiosInstance.get('buildings');
    const facilitiesApi = axiosInstance.get('facilities');

    // Call api data at the same time
    axios
      .all([buildingsApi, facilitiesApi])
      .then(
        axios.spread((...responses) => {
          const buildings = responses[0].data.data;
          const facilities = responses[1].data.data;

          setBuilding(buildings);
          setFacilities(facilities);
        }),
      )
      .catch(err => {
        console.log('Managing ', err.response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <ManagingContainer
        // Content
        managingName={'Quản lý tòa nhà'}
        totalManagingTitleText={'Số lượng tòa nhà'}
        totalManagingContentText={buildings ? buildings.length : 0}
        onPress={() => {
          navigation.navigate(MANAGING_BUILDING);
        }}
        IconManagingBtn={<Setting />}
        managingBtnText={'Quản lý tòa nhà'}
        IconManagingText={<BuildingIcon />}
      />

      <ManagingContainer
        managingName={'Quản lý thiết bị'}
        totalManagingTitleText={'Số lượng thiết bị'}
        totalManagingContentText={facilities ? facilities.length : 0}
        onPress={() => {
          navigation.navigate(MANAGING_FACILITIES);
        }}
        IconManagingBtn={<Setting />}
        managingBtnText={'Quản lý thiết bị'}
        IconManagingText={<DeviceIcon />}
      />
    </Container>
  );
};

export default Managing;
