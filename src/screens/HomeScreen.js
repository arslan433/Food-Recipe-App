import { View, Text, StatusBar, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';
export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState("Beef")
    const [categories, setCategories] = useState([])
    const [meals, setMeals] = useState([])
    useEffect(() => {
        getCategories()
        getRecipes()
    }, [])

    const handleChangeCategory = (category) => {
        getRecipes(category)
        setActiveCategory(category)
        setMeals([])
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
            // console.log(response.data)

            if(response && response.data){
                setCategories(response.data.categories)
            }
        } catch (error) {
            console.log(error , error.message)
        }
    }


    const getRecipes = async (category="Beef") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            // console.log("recipies got",response.data)

            if(response && response.data){
                setMeals(response.data.meals)
            }
        } catch (error) {
            console.log(error , error.message)
        }
    }
    return (
        <View className='bg-white flex-1'>
            <StatusBar style='dark' />
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className='space-y-6 pt-4'>

                {/* avatar and bell icon */}
                <View className='mx-4 flex-row justify-between items-center mb-4'>
                    <Image source={require('../../assets/avatar.jpeg')} style={{ height: hp(5), width: hp(5.5) }}
                        className='rounded-full' />
                    <BellIcon size={hp(4)} color={'gray'} />

                </View>

                {/* greetings and punch line */}

                <View className='mx-4 space-y-2 mb-2'>
                    <Text style={{ fontSize: hp(1.7) }} className='text-neutral-500'>Hi, Jane!</Text>
                    <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-neutral-500'>Make your own Food</Text>
                    <Text style={{ fontSize: hp(3.8) }} className='font-semibold text-neutral-500'>stay at <Text className='text-amber-400'>home</Text></Text>
                </View>

            {/* serach bar */}
            <View className='bg-black/5 rounded-full p-[6] mx-4 flex-row items-center'>
                <TextInput placeholder='Search any recipe'
                placeholderTextColor={'gray'}
                style={{ flex: 1, fontSize: hp(2) }}
                className='flex-1 tracking-wider pl-3 mb-'
                />

                <View className='bg-white rounded-full p-3'>
                    <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color={'gray'} />
                </View>
            </View>

            {/* Categories */}
            <View>
                {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
            </View>

            {/* recipes */}
            <View>
                <Recipes meals={meals} categories={categories}/>
            </View>

            </ScrollView>
        </View>
    )
}