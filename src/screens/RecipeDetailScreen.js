import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Animated, { FadeInDown, FadeOut, FadeIn } from 'react-native-reanimated';
import Loading from '../components/loading';
import YoutubeIframe from 'react-native-youtube-iframe';
export default function RecipeDetailScreen(props) {
    const navigation = useNavigation()
    const [isFavourite, setIsFavourite] = useState(false)
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(true)
    let item = props.route.params
    // console.warn(item)

    useEffect(() => {
        setIsFavourite(item.isFavourite)
        getMealData(item.idMeal)
    }, [])

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            // console.log("get the mealData", response.data)

            if (response && response.data) {
                setMeal(response.data.meals[0])
                setLoading(false)
            }
        } catch (error) {
            console.log(error, error.message)
        }
    }

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = []
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                indexes.push(i)
            }
        }
        return indexes;
    }

    const getYoutubeVideo = url => {
       const regex = /[?&]v=([^&]+)/;
       const match = url.match(regex);
       if(match && match[1]){
        return match[1];
       }
       return null;
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 3 }}
            className='flex-1 bg-white'>
            <StatusBar barStyle={'light-content'} />

            {/* recipe image  */}

            <View className='justify-center flex-row'>
                <Image source={{ uri: item.strMealThumb }}
                    style={{ width: wp(98), height: hp(50), borderRadius: 5, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 0 }}
                    className='bg-black/5'
                    sharedTransitionTag={item.strMeal}

                />
            </View>

            {/* back button  */}

            <Animated.View entering={FadeIn.delay(200).duration(500)} className='absolute w-full flex-row justify-between items-center pt-5'>
                <TouchableOpacity onPress={() => navigation.goBack()} className='p-2 rounded-full bg-white ml-4'>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={'#fbbf24'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className='p-2 rounded-full bg-white mr-4'>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? 'red' : 'gray'} />
                </TouchableOpacity>
            </Animated.View>

            {/* meal description */}


            {
                loading ? (
                    <Loading size='large' className='m-5 pt-[50]' />
                ) : (
                    <View className='px-4 justify-center flex space-y-4 pt-8'>
                        {/* name and area  */}
                        <Animated.View  className='space-y-2' entering={FadeInDown.duration(700).springify().damping(12)}>

                            <Text style={{ fontSize: hp(3) }} className='font-bold flex-1 text-neutral-700'>{meal.strMeal}</Text>
                            <Text style={{ fontSize: hp(2.2) }} className='font-medium flex-1 text-neutral-500'>{meal.strArea}</Text>
                        </Animated.View>

                        {/* misc  */}
                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around'>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{ height: hp(6), width: hp(6) }} className='items-center justify-center rounded-full flex bg-white'>
                                    <ClockIcon color={'#525252'} strokeWidth={2.5} size={hp(4)} />
                                </View>
                                <View className='flex items-center  py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>35</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Mins</Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{ height: hp(6), width: hp(6) }} className='items-center justify-center rounded-full flex bg-white'>
                                    <UsersIcon color={'#525252'} strokeWidth={2.5} size={hp(4)} />
                                </View>
                                <View className='flex items-center  py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>3</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Services</Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{ height: hp(6), width: hp(6) }} className='items-center justify-center rounded-full flex bg-white'>
                                    <FireIcon color={'#525252'} strokeWidth={2.5} size={hp(4)} />
                                </View>
                                <View className='flex items-center  py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>103</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Cal</Text>
                                </View>
                            </View>
                            <View className='flex rounded-full bg-amber-300 p-2'>
                                <View style={{ height: hp(6), width: hp(6) }} className='items-center justify-center rounded-full flex bg-white'>
                                    <Square3Stack3DIcon color={'#525252'} strokeWidth={2.5} size={hp(4)} />
                                </View>
                                <View className='flex items-center  py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'></Text>
                                    <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Easy</Text>
                                </View>
                            </View>
                        </Animated.View>

                        {/* ingredients */}
                        <View className='space-y-4'>

                            <Text style={{ fontSize: hp(2.5) }} className='font-bold text-neutral-700'>Ingredients</Text>
                            <View className='space-y-2 ml-2'>
                                {
                                    ingredientsIndexes(meal).map((i) => {
                                        return (
                                            <View key={i} className='flex-row space-x-3 items-center'>
                                                <View
                                                    style={{ height: hp(1.5), width: hp(1.5) }}
                                                    className='bg-amber-300 rounded-full' />
                                                <View className='flex-row space-x-2'>
                                                    <Text style={{ fontSize: hp(1.7) }} className='font-medium text-neutral-600'>{meal['strIngredient' + i]}  -</Text>
                                                    <Text style={{ fontSize: hp(1.7) }} className='font-extrabold text-neutral-700'>{meal['strMeasure' + i]}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>

                        </View>
                        {/* instruction */}
                        <View className='space-y-4'>

                            <Text style={{ fontSize: hp(2.5) }} className='font-bold text-neutral-700'>Instructions</Text>
                            <View className='space-y-2 ml-2'>
                                <Text style={{ fontSize: hp(1.7) }} className='text-neutral-700'>
                                    {
                                        meal?.strInstructions
                                    }
                                </Text>
                            </View>

                        </View>

                        {/* recipe video */}
                        {
                            meal.strYoutube && (
                                <View className='space-y-4'>
                                    <Text style={{ fontSize: hp(2.5) }} className='font-bold text-neutral-700'>Recipe Video</Text>

                                    <View>
                                <YoutubeIframe videoId={getYoutubeVideo(meal.strYoutube)}
                                height={hp(30)}
                                />
                                    </View>
                                </View>

                            )
                        }

                    </View>
                )
            }

        </ScrollView>
    )
}