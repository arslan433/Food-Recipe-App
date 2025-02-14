import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { categoryData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated , { FadeInDown, FadeOut } from 'react-native-reanimated';
import { CachedImage } from '../helpers/images';

export default function Categories({activeCategory, handleChangeCategory, categories}) {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    // paddingVertical: 10
                }}
                className='space-x-4'
            >
                {
                    categories.map((cat, index) => {
                        let isActive = cat.strCategory == activeCategory
                        let activeButtonClass = isActive ? "bg-amber-400" : 'bg-black/10'
                        return (
                            <TouchableOpacity key={index} className='flex items-center space-y-1'
                            onPress={()=>handleChangeCategory(cat.strCategory)}
                            >
                                <View className={'rounded-full p-[6px] ' + activeButtonClass}>
                                    <Image source={{ uri: cat.strCategoryThumb }}
                                        style={{ height: hp(6), width: hp(6) }}
                                        className='rounded-full '
                                    />
                                    {/* <CachedImage 
                                     uri={ cat.strCategoryThumb }
                                    style={{ height: hp(6), width: hp(6) }}
                                    className='rounded-full '
                                    /> */}
                                </View>
                                <Text className='text-neutral-600'>{cat.strCategory}</Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
        </Animated.View>
    )
}