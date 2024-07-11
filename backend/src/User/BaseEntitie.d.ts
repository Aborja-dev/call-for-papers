export interface UserBase {
    id: number
    name: string
    email: string
    password: string
    role: 'user' | 'admin' | string
}

export interface UserSesion {
    token: string,
    name: string
    role: 'user' | 'admin'
    id : number
}

export interface UserProfile extends UserBase {
    adress: string,
    createdAt: Date
}