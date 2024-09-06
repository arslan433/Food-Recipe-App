import { View, Text, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const ring1padding = useSharedValue(0)
    const ring2padding = useSharedValue(0)

    const navigation = useNavigation()
    useEffect(()=>{
        ring1padding.value = 0
        ring2padding.value = 0
        setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(3)), 100)
        setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5)), 300)
        setTimeout(()=> navigation.navigate('Home'), 2000)
    })

    return (
        <View className='items-center justify-center flex-1 space-y-10 bg-amber-500'>
            <StatusBar barStyle='light' />
            {/* logo image */}
            <Animated.View className='bg-white/20 rounded-full ' style={{padding:ring2padding}}>
                <Animated.View className='bg-white/20 rounded-full 'style={{padding:ring1padding}}>
                    <Image source={require('../../assets/download-removebg-preview.png')}
                        style={{ height: hp(30), width: hp(30) }}
                    />
                </Animated.View>
            </Animated.View>

            {/* title and punchlines */}
            <View className='flex items-center space-y-2'>
                <Text style={{fontSize:hp(7)}} className='text-white  font-bold tracking-widest'>Foody</Text>
                <Text style={{fontSize:hp(2)}} className='text-white  font-medium tracking-widest '>Food is always right</Text>

            </View>
        </View>
    )
}