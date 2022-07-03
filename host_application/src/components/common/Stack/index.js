import React from 'react';
import {
  ACCOUNT,
  ANALYST,
  INTRODUCE,
  QRCODE,
  ROOMDETAILS,
  SETTINGS,
} from '../../../constants/routeNames';
import Account from '../../../screens/Account';
import Analyst from '../../../screens/Analyst';
import Introduce from '../../../screens/Introduct';
import QRCode from '../../../screens/QRCode';
import RoomDetails from '../../../screens/RoomDetails';
import Settings from '../../../screens/Settings';

const getCommon = Stack => {
  return [
    <Stack.Screen name={ANALYST} component={Analyst} />,
    <Stack.Screen name={QRCODE} component={QRCode} />,
    <Stack.Screen name={SETTINGS} component={Settings} />,
    <Stack.Screen name={ACCOUNT} component={Account} />,
    <Stack.Screen name={INTRODUCE} component={Introduce} />,
    <Stack.Screen name={ROOMDETAILS} component={RoomDetails} />,
  ];
};

export default getCommon;
