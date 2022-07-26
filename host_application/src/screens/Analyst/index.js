import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconMenu from '../../assets/icons/menu_icon.svg';
import AnalystContainer from '../../components/common/Analyst';
import Container from '../../components/common/Container';
import axiosInstance from '../../helpers/axiosInterceptor';
import SettingHeaderNavigator from '../../utils/SettingHeaderNavigator';

const Analyst = () => {
  SettingHeaderNavigator.settingHeaderNavigator({
    MenuIcon: IconMenu,
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
    axios.all([buildingsApi, facilitiesApi]).then(axios.spread((...responses)=>{
      const buildings = responses[0].data.data;
      const facilities = responses[1].data.data;
    
      setBuilding(buildings);
      setFacilities(facilities);
    })).catch(err=>{
      console.log(err.message);
    });

  }

  useEffect(()=>{
    fetchData();
  }, [])


  return (
    <Container>
      <AnalystContainer
        title={'Tổng số thiết bị'}
        content={`${facilities.length} thiết bị`}
        titleNavigation={'Xem chi tiết'}
      />

      <AnalystContainer
        title={'Tòa nhà'}
        content={`${buildings.length} tòa nhà`}
        titleNavigation={'Xem chi tiết'}
      />
      <AnalystContainer
        title={'Thiết bị cần sửa chữa'}
        content={'2 thiết bị'}
        titleNavigation={'Xem chi tiết'}
      />

      <AnalystContainer
        title={'Thiết bị tổn hại'}
        content={'12 thiết bị'}
        titleNavigation={'Xem chi tiết'}
      />
    </Container>
  );
};

export default Analyst;
