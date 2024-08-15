
export interface UserData {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    token: string
    refreshToken: string
}

export interface LoginData {
    email: string
    password: string
}
