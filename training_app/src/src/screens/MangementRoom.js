import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import Room from './Room'


const MangementRoom = ({onPress,text}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </Pressable>
  )
}

export default MangementRoom

const styles = StyleSheet.create({})