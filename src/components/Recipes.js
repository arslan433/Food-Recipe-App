import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mealData } from '../constants';
import MasonryList from "@react-native-seoul/masonry-list"
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/images';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({categories, meals}) {
    const navigation = useNavigation()
    return (
        <View className='mx-4 space-y-3'>
            <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600'>Recipes</Text>
            <View>
                {
                    categories.length ==0 || meals == 0 ? (
                        <Loading size="large" className='mt-20' />
                    ) :
                    <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation}/>}
                    //   refreshing={isLoadingNext}
                    //   onRefresh={() => refetch(RecipeCard)}
                    onEndReachedThreshold={0.1}
                //   onEndReached={() => loadNext(ITEM_CNT)}

                />
                      
                }
            </View>
        </View>
    )
}

const RecipeCard = ({ item, index,navigation }) => {
    let isEven = index % 2 == 0
    return (
        <Animated.View>
            <Pressable
                style={{ width: "100%", paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                className="flex justify-center mb-4 space-y-1"
                onPress={()=>navigation.navigate('RecipeDetail' , {...item})}
            >
                <Image source={{ uri: item.strMealThumb }}
                    style={{ width: "100%", height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35, }}
                    className='bg-black/5'
                    sharedTransitionTag={item.strMeal}
                />
                {/* <CachedImage 
                uri={ item.strMealThumb }
                style={{ width: "100%", height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35, }}
                className='bg-black/5'
                /> */}

                <Text numberOfLines={1} style={{ fontSize: hp(1.7) }} className='font-semibold ml-2 text-neutral-600'>{item.strMeal}</Text>
            </Pressable>
        </Animated.View>
    )
}