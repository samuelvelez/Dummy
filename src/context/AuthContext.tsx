import React, { createContext, useEffect, useReducer } from 'react'
import { AuthReducer, AuthState } from './AuthReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { LoginData, UserData } from '../interfaces/appInterface'
import dummyApi from '../api/dummyApi'

interface AuthContextProps {
    errorMessage: string
    token: string | null
    user: UserData | null
    status: 'checking' | 'authenticated' | 'not-authenticated'
    signUp: (registerData: LoginData) => void
    signIn: (loginData: LoginData) => void
    logOut: () => void
    removeError: () => void
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
    //const qs = require('qs')

    const [state, dispatch] = useReducer(AuthReducer, authInitialState)

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (!token) { dispatch({ type: 'notAuthenticated' }) }

            const myuser: UserData = jwtDecode.jwtDecode(token!)//jwtDecode(token!)
            dispatch({
                type: 'setToken',
                payload: {
                    access_token: token!,
                    user: myuser
                }
            })

        } catch (err: any) {
            console.log('error checktoken: ', err)
        }
    }

    const signUp = async () => {
        console.log('sign up')
    }

    const signIn = async ({ email, password }: LoginData) => {
        /*const data_user = { username: email, password }
        const dataToSend = {
            username: email,
            password
        }
        const options = {
            method: 'POST',
            url: 'https://552fbf77-f97b-47cf-80e2-6bcec41a1d57.mock.pstmn.io/success',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataToSend
            */
        try {
            const resp = await dummyApi.post('/auth/login', JSON.stringify({ username: email, password }))
            console.log(resp.data.token)
            const decoded: UserData = jwtDecode(resp.data.token)//jwtDecode.jwtDecode(resp.data.token)
            console.log("decoded", decoded)
            try {
                await AsyncStorage.setItem('token', resp.data.token)
                await AsyncStorage.setItem('user', resp.data.username)

            } catch (err) {
                console.log('error asyncstorage', err)
            }

            dispatch({
                type: 'signIn',
                payload: {
                    token: resp.data.token,
                    user: decoded

                }
            })
        } catch (err: any) {
            console.log('err', err)
            dispatch({
                type: 'addError',
                payload: err.message ?? 'Información incorrecta'
            })
        }
    }

    const logOut = async () => {
        console.log("llego al authcontext")
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'logout' })
    }

    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            signUp,
            logOut,
            removeError,
            ...state
        }}>
            {children}
        </AuthContext.Provider>
    )

}