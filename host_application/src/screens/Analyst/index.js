import axios from 'axios';
import React, {useEffect, useState} from 'react';
import IconMenu from '../../assets/icons/menu_icon.svg';
import AnalystContainer from '../../components/common/Analyst';
import Container from '../../components/common/Container';
import {TOTAL_DEVICES} from '../../constants/routeNames';
import axiosInstance from '../../helpers/axiosInterceptor';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';

const Analyst = ({navigation}) => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: IconMenu,
    styles: {
      marginHorizontal: 10,
    },
  });

  const [buildings, setBuilding] = useState({});
  const [facilities, setFacilities] = useState({});
  const [rooms, setRooms] = useState({});

  //Api
  const fetchData = () => {
    const buildingsApi = axiosInstance.get('buildings');
    const facilitiesApi = axiosInstance.get('facilities');
    const roomsApi = axiosInstance.get('rooms');

    // Call api data at the same time
    axios
      .all([buildingsApi, facilitiesApi, roomsApi])
      .then(
        axios.spread((...responses) => {
          const buildings = responses[0].data.data;
          const facilities = responses[1].data.data;
          const rooms = responses[2].data.data;

          setBuilding(buildings);
          setFacilities(facilities);
          setRooms(rooms);
        }),
      )
      .catch(err => {
        console.log('Statistic: ', err.response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <AnalystContainer
        title={'Tổng số thiết bị'}
        content={`${facilities.length ? facilities.length : 0} thiết bị`}
      />

      <AnalystContainer
        title={'Tòa nhà'}
        content={`${buildings.length ? buildings.length : 0} tòa nhà`}
      />

      <AnalystContainer
        title={'Phòng'}
        content={`${rooms.length ? rooms.length : 0} phòng`}
      />
    </Container>
  );
};

export default Analyst;
