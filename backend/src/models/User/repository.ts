import { PrismaClient } from "@prisma/client"
import { InsertUserSchema, UpdateUserSchema } from "./types"
import { IUserRepository } from "./interfaces"

export class UserRepository implements IUserRepository<InsertUserSchema, UpdateUserSchema> {
    constructor(
        private readonly dbConnection: PrismaClient
    ) { }

    async insert(user: InsertUserSchema) {
        try {
            await this.dbConnection.user.create({ data: user })
        } catch (error) {
            throw error 
        }
    }
    async searchByEmail (email: string) {
        try {
            const user = await this.dbConnection.user.findUnique({
                where: { email }
            })
            return user
        } catch (error) {
            throw error
        }
    }
    async update ({id, updateData}: { id: number, updateData: any }) {
        try {
            await this.dbConnection.user.update({
                where: { id },
                data: updateData
            })
        } catch (error) {
            throw error
        }
    }


}