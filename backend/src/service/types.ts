import { Role } from "../models/types/consts"

export interface UserSesion {
    token: string,
    name: string
    role: Role
    id : number
}