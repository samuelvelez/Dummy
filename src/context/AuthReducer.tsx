import { UserData } from '../interfaces/appInterface'

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated'
    token: string | null
    errorMessage: string
    user: UserData | null
}

type AuthAction =
    | { type: 'notAuthenticated' }
    | { type: 'signIn', payload: { token: string, user: UserData } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'logout' }
    | { type: 'setToken', payload: { access_token: string, user: UserData } }

export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                errorMessage: action.payload,
                user: null,
                status: 'not-authenticated',
                token: null
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        case 'signIn':
            return {
                ...state,
                errorMessage: '',
                user: action.payload.user,
                status: 'authenticated',
                token: action.payload.token
            }
        case 'notAuthenticated':
        case 'logout':
            return {
                ...state,
                status: 'not-authenticated',
                token: null
            }
        case 'addError':
            return {
                ...state,
                errorMessage: action.payload,
                user: null,
                status: 'not-authenticated',
                token: null
            }
        case 'setToken':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.access_token,
                status: 'authenticated'
            }
        default:
            return {
                ...state,
                status: 'not-authenticated'
            }
    }
}
