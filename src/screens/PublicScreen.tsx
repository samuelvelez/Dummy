import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'

export const PublicScreen = () => {

    const navigation = useNavigation()
    return (
        <ImageBackground source={require('../assets/artistic_background.jpg')} style={styles.image}>
            <SafeAreaView>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.login}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end"
    },
    login: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        margin: 10
    }
})
