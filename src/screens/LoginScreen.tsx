import React, { useContext } from 'react'
import { Image, Keyboard, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import { useForm } from '../hooks/useForm'
import { AuthContext } from '../context/AuthContext'

export const LoginScreen = () => {

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    })
    const { signIn, removeError, errorMessage } = useContext(AuthContext)

    const handleEmailChange = (email: string) => {
        onChange(email, 'email')
    }

    const handlePasswordChange = (password: string) => {
        onChange(password, 'password')
    }

    const onLogin = async () => {
        Keyboard.dismiss()
        console.log(email, password)
        signIn({ email, password })
    }

    return (
        <View style={styles.formContainer}>
            <View style={styles.logoImage}>
                <Image source={{ uri: 'https://hibarnsley.com/wp-content/uploads/2017/06/dummy-logo.png' }} style={styles.logo} />
            </View>
            <View style={{ width: '100%', paddingTop: 50 }}>
                <View>
                    <Text style={styles.label}>Username</Text>
                </View>
                <View style={{ width: '100%' }}>
                    <TextInput placeholder={"Usuario"}
                        keyboardType={'email-address'}
                        underlineColorAndroid="white"
                        style={styles.inputField}

                        onChangeText={handleEmailChange}
                        value={email}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.label}>Password</Text>
                </View>
                <View style={{ width: '100%' }}>
                    <TextInput placeholder={"Password"}
                        keyboardType={'email-address'}
                        underlineColorAndroid="white"
                        style={styles.inputField}

                        onChangeText={handlePasswordChange}
                        value={password}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={onLogin} style={styles.loginbtn}>
                    <Text style={styles.logintxt}>Login</Text>
                </TouchableOpacity>



                <TouchableOpacity>
                    <Text style={{ color: 'blue', textAlign: 'right', marginTop: 10 }}>Forgot password?</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity>
                    <Text style={styles.logintxt}>Register</Text>
                </TouchableOpacity>*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    logoImage: {
    },
    logo: {
        width: 300,
        height: 100
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    inputField: {
        fontSize: 20,
        borderColor: '#084B83',
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
        width: '100%',
    },
    loginbtn: {
        backgroundColor: '#662549',
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    logintxt: {
        color: '#E8BCB9',
        textAlign: 'center',
        fontSize: 20
    }


})
