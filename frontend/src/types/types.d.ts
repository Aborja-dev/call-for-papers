export type LoginInput = {
    email: string
    password: string
}

export type UserSesion = {
    token: string,
    name: string
    role: 'user' | 'admin'
    id : number
}

export type UserProfile = {
    id: number
    name: string
    email: string
    password: string
    role: 'user' | 'admin'
    adress: string
}