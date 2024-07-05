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