import { AuthService } from "@src/auth-service"
import { UserBase, UserProfile } from "@src/User/BaseEntitie"
import { ForUserManagement, ForUserRepo } from "@src/User/interfaces"


// TODO refactorizar a geter
export class UserRepoStub implements ForUserRepo {
    constructor (readonly users: UserBase[]) {}
    create: ForUserRepo["create"] = async (user ) => {
        this.users.push({
            id: this.users.length + 1,
            ...user
        })
     }

    getAll: ForUserRepo["getAll"] = async () => {
        return this.users
    }

    findByEmail: ForUserRepo["findByEmail"] = async (email) => {
        return this.users.find(user => user.email === email)
    }

    findById: ForUserRepo["findById"] = async (id) => {
        const user = this.users.find(user => user.id === id)
        if (!user) return undefined
        return {
            ...user,
            adress: 'address'
        }
    }

    update: ForUserRepo["update"] = async ({id, updateData}) => {
        const user = this.users.find(user => user.id === id)
        if (!user) return
        Object.assign(user, updateData)
    }
}

export class UserServiceStub implements ForUserManagement {
    constructor (private repository: ForUserRepo) {}
    async register(user: Pick<UserBase, "name" | "email" | "password" >) {
        await this.repository.create({
            ...user,
            role: 'user',
            password: await AuthService.hashPassword(user.password)
        })
    }
    async login(email: string, password: string) {
        const user = await this.repository.findByEmail(email)
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
        const user = await this.repository.findById(id)
        return user ?? null
    }
    recover: (email: string) => Promise<UserBase | null> = async (email) => {
        const user = await this.repository.findByEmail(email)
        return user ?? null
    }

    async updateProfile({id, updateData}: {id: number, updateData: Partial<UserBase>}) {
        const user = await this.repository.findById(id)
        if (!user) return false
        await this.repository.update({id, updateData})
        return true
    }
    changePassword: ({ id, password }: { id: number; password: string }) => Promise<boolean> = async ({ id, password }) => {
        const user = await this.repository.findById(id)
        await this.repository.update({ id, updateData: { 
            ...user,
            password: await AuthService.hashPassword(password) 
        } })
        return true
    }
}