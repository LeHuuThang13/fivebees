import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button,StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import  Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigator from './TabNavigator';
import QRcode from './QRcode';
import Custumize from './Custumize';
import Statisticaly from './Statisticaly';
import Webversion from './Webversion';
import Account from './Account';
import Help from './Help';
import Logout from './Logout';


function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Icon name='home' size={22}/>
     
      <Button 
      title='Logout'
      onPress={() => navigation.navigate('Login')}
      />
       {/* <MyTabs /> */}
       
    </View>
  );
}


// function Statistical(){
//   return(  
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>Statistical Screen</Text>
// </View>
// );
// }
// function QRCode(){
//   return(  
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>QR code Screen</Text>
  
// </View>
// );
// }
// function Custumize(){
//   return(  
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>Custumize Screen</Text>
// </View>
// );
// }
// function Webversion(){
//   return(  
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>Webversion Screen</Text>
// </View>
// );
// }
// function Account(){
//   return(  
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>Account Screen</Text>
// </View>
// );
// }
// function Help(){
//   return(  
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>Help Screen</Text>
// </View>
// );
// }
// function Logout(){
//   return(  
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text>Logout Screen</Text>
  
// </View>
// );
// }

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation >
      <Drawer.Screen name="Trang Chủ" component={TabNavigator} />
      <Drawer.Screen name="Tùy chỉnh" component={Custumize} />
      <Drawer.Screen name="Thống kê" component={Statisticaly}/>
      <Drawer.Screen name="QRCode" component={QRcode}/>
      <Drawer.Screen name="Phiên bản Web" component={Webversion}/>
      <Drawer.Screen name="Tài khoản" component={Account}/>
      <Drawer.Screen name="Hướng dẫn sử dụng" component={Help}/>
      <Drawer.Screen name="Đăng xuất" component={Logout}/>
      
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
iconQR: {
  position:'absolute',
  left: 20
}
})
export default MyDrawer