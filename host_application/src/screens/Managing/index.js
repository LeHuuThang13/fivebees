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
import {MANAGING_BUILDING, MANAGING_DEVICES} from '../../constants/routeNames';
import axiosInstance from '../../helpers/axiosInterceptor';
import axios from 'axios';

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
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <ManagingContainer
        managingName={'Quản lý tòa nhà'}
        totalManaging={'Số lượng tòa nhà'}
        totalDevices={buildings ? buildings.length : 0}
        onPress={() => {
          navigation.navigate(MANAGING_BUILDING);
        }}
        IconBtn={<Setting />}
        titleBtn={'Quản lý tòa nhà'}
        IconManaging={<BuildingIcon />}
      />

      <ManagingContainer
        managingName={'Quản lý thiết bị'}
        totalManaging={'Số lượng thiết bị'}
        totalDevices={facilities ? facilities.length : 0}
        onPress={() => {
          navigation.navigate(MANAGING_DEVICES);
        }}
        IconBtn={<Setting />}
        titleBtn={'Quản lý thiết bị'}
        IconManaging={<DeviceIcon />}
      />
    </Container>
  );
};

export default Managing;
