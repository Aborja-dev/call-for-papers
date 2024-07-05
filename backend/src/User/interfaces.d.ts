import { UserBase, UserProfile, UserSesion } from "@src/User/BaseEntitie"

export interface ForUserRepo  {
    users: UserBase[]
    create: (user: Pick<UserBase, "name" | "email" | "password" | "role">) => Promise<void>
    getAll : () => Promise<UserBase[]>
    findById: (id: number) => Promise<UserProfile | undefined>
    findByEmail: (email: string) => Promise<UserBase | undefined>
    update: ({id, updateData}: {id: number, updateData: Partial<UserBase>}) => Promise<void>
}

export interface ForUserManagement {
    register: (user: Pick<UserBase, "name" | "email" | "password" | "role">) => Promise<void>
    login: (email: string, password: string) => Promise<UserSesion>
    getProfile: (id: number) => Promise<UserProfile>
    recover: (email: string) => Promise<boolean>
    updateProfile: ({id, updateData}: {id: number, updateData: Partial<UserBase>}) => Promise<boolean>
    changePassword: ({id, password}: {id: number, password: string}) => Promise<boolean>
}