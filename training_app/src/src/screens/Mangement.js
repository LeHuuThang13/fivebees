import { StyleSheet, Text, View,ScrollView, Image, FlatList, StatusBar} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import RoomItem from './RoomItem';

const Mangement = (props) => {
  const [room,setRooms]= useState([
    {
      product:'Smart tv 4k sony',
      url:'https://cdn.mediamart.vn/images/product/smart-tivi-4k-sony-kd-55x80j-55-inch-android-tv_6f6573fb.jpg',
      amount:'1',
      status:'Bình thường',
      
    },
    {
      product:'Máy lạnh Funiki',
      url:'http://img.websosanh.vn/v2/users/root_product/images/dieu-hoa-funiki-9000btu-2/bi39l6wbp5ti1.jpg',
      amount:'1',
      status:'Bình thường',
      
    },
    {
      product:'Giường ngủ đôi',
      url:'https://product.hstatic.net/1000190420/product/combo_phong_ngu_08__1__c503e75d2ea54e4297f820dfede5c087.jpg',
      amount:'2',
      status:'Bình thường',
      
    },
    {
      product:'Mền ngủ trắng',
      url:'https://thegioidemviet.vn/wp-content/uploads/2019/03/ruot-chan-khach-san.png',
      amount:'1',
      status:'Bình thường',
      
    },
    {
      product:'Gối',
      url:'https://product.hstatic.net/1000203256/product/ruot-goi-tua-lung-trang-tri-sofa-cao-cap__4__ca4ddc946fe04fde854e04577763247a_master.jpg',
      amount:'4',
      status:'Bình thường',
      
    },
    {
      product:'Đèn ngủ',
      url:'https://tuvanmuasam.com/wp-content/uploads/2021/05/den-ngu-tot-nhat.jpg',
      amount:'2',
      status:'Bình thường',
      
    }, {
      product:'Bồn tắm',
      url:'https://hungtuy.com.vn/mediacenter/media/images/1498/products/1498/1513/bon-tam-massage-glass---lis-180x110-1553501605.jpg',
      amount:'1',
      status:'Bình thường',
      
    },
    {
      product:'Bồn cầu',
      url:'https://product.hstatic.net/1000260960/product/c3b324e823959e1941619f0811bc84e3_3ce4d2455b1d4585be3ac334c2e15b8e_master.jpg',
      amount:'1',
      status:'Bình thường',
      
    },
    {
      product:'Vòi hoa sen',
      url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU5JXnziR8qNZOsgykIY212OEIeicPAu-caNrXu1k_QGQtxJD4KOF3fE-PcgwN37vzHHg&usqp=CAU',
      amount:'1',
      status:'Bình thường',
      
    },
    {
      product:'Bồn rửa tay',
      url:'https://www.tdm.vn/image/cache/catalog/danhmuc/dm-chauruatreotuong-200x200.jpg',
      amount:'1',
      status:'Bình thường',
      
    }

  ])

  return (
    <View >
      
         <View style={{   
            backgroundColor: 'white',
            padding: 30,
            zIndex: 3,
            
 }}>        
            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'grey',fontWeight:'bold'}}>Tình trạng : </Text>
            <Text style={{fontSize:15,color:'#b9f6ca',fontWeight:'bold'}}>Đang sử dụng</Text>
            </View>
            <Text style={{fontSize:15,color:'grey',fontWeight:'bold'}}>Tổng thiết bị  : 10</Text>
            <Text style={{fontSize:15,color:'grey',fontWeight:'bold'}}>Thiết bị hư : Không</Text>
          </View >

     
         

    <ScrollView>
     {room.map(eachroom =><RoomItem rooms ={eachroom} key={eachroom.product}
     /> )}
    </ScrollView>
    {/* <FlatList
            data={DATA}
            renderItem={({item}) => <RoomItem room ={item} key={item.product}/>}
            keyExtractor={eachroom => item.product}            
          /> */}
   
      </View>
  )
}

export default Mangement

const styles = StyleSheet.create({
  
})