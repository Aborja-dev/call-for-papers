import { AuthService } from '@src/auth-service';
import { CreateUser, ForRepositoryPort, UpdateUser, UserType } from "../adapters/types"
import { UserSesion } from "./types"

export interface ForUserManagement {
    register: (user: CreateUser) => Promise<void>
    login: (email: UserType['email'], password: UserType['password']) => Promise<UserSesion | null>
    getProfile: (id: number) => Promise<any | null>
    recover: (email: string) => Promise<UserType | null>
    updateProfile: ({id, updateData}: {id: number, updateData: UpdateUser}) => Promise<void>
    changePassword: ({id, password}: {id: number, password: string}) => Promise<void>
}

export class UserService implements ForUserManagement {
    constructor(private readonly userRepo: ForRepositoryPort) {  }

    async register(user: CreateUser) {
        try {
            await this.userRepo.insert({
                ...user,
                password: await AuthService.hashPassword(user.password)
            })
        } catch (error) {
            throw error
        }
    }

    async login(email: UserType['email'], password: UserType['password']) {
        const user = await this.userRepo.searchByEmail(email)
        if (!user) return null
        const verified = await AuthService.verifyPassword(password, user.password)
        if (!verified) return null
        const token = await AuthService.generateToken({
            id: user.id,
            role: user.role
        })
        return {
            token,
            name: user.name,
            role: user.role,
            id: user.id
        }
    }

    async getProfile(id: number) {
        throw new Error('Method not implemented.')
        const user = await this.userRepo
        if (!user) return null
        return user
    }

    async recover(email: string) {
        const user = await this.userRepo.searchByEmail(email)
        if (!user) return null
        return user
    }

    async updateProfile({id, updateData}: {id: number, updateData: UpdateUser}) {
        await this.userRepo.update({ id, updateData })
    }

    async changePassword({id, password}: {id: number, password: string}) {
        await this.userRepo.update({ id, updateData: { password: await AuthService.hashPassword(password) } })
    }
}