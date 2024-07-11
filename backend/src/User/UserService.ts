import { PrismaClient } from "@prisma/client";
import { UserBase, UserProfile } from "@src/User/BaseEntitie";
import { ForUserRepo } from "@src/User/interfaces";

const prisma = new PrismaClient()

export class PrismaUserRepo implements ForUserRepo {
    users!: UserBase[];
    create: (user: Pick<UserBase, "name" | "email" | "password" | "role">) => Promise<void> 
    = async (user) => {
        await prisma.user.create({ data: user })
    }

    getAll: () => Promise<UserBase[]> = async () => {
        const users = await prisma.user.findMany()
        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role as 'admin' | 'user',
                password: user.password
            }
        })
    }

    findById: (id: number) => Promise<UserProfile | undefined> = async (id) => {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) return undefined
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as 'admin' | 'user',
            password: user.password,
            adress: 'address',
            createdAt: user.createdAt
        }
    }

    findByEmail: (email: string) => Promise<UserBase | undefined> = async (email) => {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return undefined
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as 'admin' | 'user',
            password: user.password
        }
    }

    update: ({ id, updateData }: { id: number, updateData: Partial<UserBase> }) => Promise<void> = async ({ id, updateData }) => {
        await prisma.user.update({ where: { id }, data: updateData })
    }
}

