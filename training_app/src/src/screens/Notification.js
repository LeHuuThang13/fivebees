import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';


const RoomMa = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='demo2' component={Demo} options={{headerShown: false}}/>
      <Stack.Screen name='demo3' component={Demo1}/>
    </Stack.Navigator>
  )
}
const Notification = ({ navigation }) => {
  return (
    <View style={{backgroundColor:'white'}}>
      <View style={{flexDirection:'row'}}>
      <Icon name='delete-outline' size={30} style={{marginLeft:320}}/>
      <Text style={{fontSiz:16,fontWeight:'bold',top:6,right:2}}>Dọn dẹp</Text>
      </View>
    <View style={{flex:1,top:20,backgroundColor:'white',marginLeft:5,marginRight:5
   }}>
      
      <View style={{backgroundColor:'white',borderWidth:0.5,width:'100%',height:140,
      flexDirection:'row',borderLeftWidth:15,borderLeftColor:'blue',borderBottomColor:'grey',
      borderRightColor:'grey',borderTopColor:'grey',borderRadius:8,shadowOpacity: 0.34,
      shadowRadius: 6.27, elevation: 10,
      }}>
       
        <Text style={{left:35,top:5,fontSize:16,fontWeight:'bold'}}>Thông báo</Text>
        <Text style={{left:45,top:5,fontSize:16,fontWeight:'bold'}}>Vừa mới</Text>
        <Icon name='notifications' size={26} style={{left:-130,top:5,bottom:18}}/>
          
        <Text style={{top:35,right:150,fontWeight:'bold'}}>Thang60c đã thêm MediaMart Smart Tivi 
        </Text>
        <Text style={{top:55,right:410,fontWeight:'bold'}}>4K Sony KD-55X80J 55 inch Google TV trong phòng 101</Text>  
      </View>
      <View>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Mangement')} style={{
              alignItems:'center',
              width:140,
              height:35,
              marginLeft:200,
              backgroundColor: '#2196f3' ,
              right:-60
              ,fontWeight:'bold',
              borderRadius:8  ,
              marginTop:-50  
          }}
        >
          <Text style={{fontSize:16,color:'white',top:5 }}>
            Xem chi tiết
            
          </Text>
          <Icon name='settings' size={26} style={{right:55,bottom:18, color:'white'}}/>
        </TouchableOpacity>
      </View>
          <View style={{top:15}}>
          <View style={{backgroundColor:'white',borderWidth:1,width:'100%',height:140,
      flexDirection:'row',borderLeftWidth:15,borderLeftColor:'blue',borderBottomColor:'grey',
      borderRightColor:'grey',borderTopColor:'grey',borderRadius:8,borderWidth:0.5,shadowOpacity: 0.34,
      shadowRadius: 6.27,
      
      elevation: 10,
      }}>
       
        <Text style={{left:35,top:5,fontSize:16,fontWeight:'bold'}}>Thông báo</Text>
        <Text style={{left:45,top:5,fontSize:16,fontWeight:'bold'}}>Vừa mới</Text>
        <Icon name='notifications' size={26} style={{left:-130,top:5,bottom:18}}/>
          
        <Text style={{top:35,right:150,fontWeight:'bold'}}>Thang60c đã thêm MediaMart Smart Tivi 
        </Text>
        <Text style={{top:55,right:410,fontWeight:'bold'}}>4K Sony KD-55X80J 55 inch Google TV trong phòng 101</Text>  
      </View>
      <View>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Mangement')} style={{
              alignItems:'center',
              width:140,
              height:35,
              marginLeft:200,
              backgroundColor: '#2196f3' ,
              right:-60
              ,fontWeight:'bold',
              borderRadius:8  ,
              marginTop:-50  
          }}
        >
          <Text style={{fontSize:16,color:'white',top:5 }}>
            Xem chi tiết
            
          </Text>
          <Icon name='settings' size={26} style={{right:55,bottom:18, color:'white'}}/>
        </TouchableOpacity>
      </View>
          </View>
          </View>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})