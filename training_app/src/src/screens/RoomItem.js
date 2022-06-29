import { StyleSheet, Text, View,ScrollView,url, Image, FlatList, StatusBar} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
const RoomItem =(props) =>{

let{rooms}=props
debugger
    return(     
    <View style={{ flex:1,backgroundColor:'white',marginTop:1} }>
    <View style={{height:140,backgroundColor:'white',paddingTop:30, flexDirection:'row',marginTop:5} }> 
        <Image 
            style={{width:110,height:80, marginLeft:20, marginRight:20, resizeMode:'cover'}}
            source={
              // {uri:url}
            require('../../assets/images/tv2.png')
    }/>
        <View style={{
          backgroundColor:'white'
          ,flex:1
          ,marginRight:10,
          marginBottom:10,
          }}>
            <Text style={{fontSize:15,color:'grey',fontWeight:'bold'}}>Sản phẩm: Smart tivi 4k sony</Text>
            <Text style={{fontSize:15,color:'grey',fontWeight:'bold'}}>Số lượng: 1</Text>
            <Text style={{fontSize:15,color:'grey',fontWeight:'bold'}}>Tình trạng: Bình thường</Text>
            <View style={{flexDirection:'row'}}>
              <Icon name ='border-color' size={26} style={{left:5}}/>
              <Icon name ='delete' size={26} style={{left:10}}/>
            </View>    
        </View>
    </View>
    
</View>

)
}
export default RoomItem