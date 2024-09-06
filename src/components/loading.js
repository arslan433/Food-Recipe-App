import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading(props) {
  return (
    <View className='flex-1 items-center justify-center'>
     <ActivityIndicator {...props}/>
    </View>
  )
}