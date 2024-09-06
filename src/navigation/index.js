import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator()


export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen}  />
                <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen}  />
                <Stack.Screen name="RecipeDetail" options={{ headerShown: false }} component={RecipeDetailScreen}  />
            </Stack.Navigator>
        </NavigationContainer>


    )
}