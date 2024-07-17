import { Role } from "../types/consts"

export interface InsertUserSchema {
    name: string
    email: string
    password: string
    role: Role
}

export interface UpdateUserSchema {
    name?: string
    password?: string
    role?: Role
}
