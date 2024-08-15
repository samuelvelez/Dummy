import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { HomeScreen } from '../screens/HomeScreen'
import { PublicScreen } from '../screens/PublicScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { Text, TouchableOpacity } from 'react-native'
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'


const Stack = createNativeStackNavigator()
export const Navigator = () => {
    const { status, logOut } = useContext(AuthContext)
    console.log('status: ', status)
    const rightComponent = (props: HeaderButtonProps) => {
        return (
            <TouchableOpacity onPress={logOut}>
                <Text>Logout</Text>
            </TouchableOpacity>
        )
    }
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            {status !== 'authenticated' ?
                <>
                    <Stack.Screen name="PublicScreen" component={PublicScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: true, headerBackTitle: "Back" }} />
                </>
                :
                <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: true, headerRight: rightComponent, headerTitle: 'Home' }} />
                </>
            }
        </Stack.Navigator>
    )
}
