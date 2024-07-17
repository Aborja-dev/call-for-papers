import { Role } from '../models/types/consts';
import { UserRepository } from './../models/User/repository';
import { CreateUser, ForRepositoryPort, UpdateUser } from "./types"

export class UserRepositoryDriver implements ForRepositoryPort {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async insert({ name, email, password, role }: CreateUser) {
        try {
            await this.repository.insert({
                name,
                email,
                password,
                role
            })
        } catch (error) {
            throw error
        }
    }

    async searchByEmail(email: string) {
        try {
            const user = await this.repository.searchByEmail(email)
            if (!user) return null
            return {
                ...user,
                role: user?.role as Role
            }
        } catch (error) {
            throw error
        }
    }

    async update({ id, updateData }: { id: number, updateData: UpdateUser }) {
        try {
            await this.repository.update({ id, updateData })
        } catch (error) {
            throw error
        }
    }
}
