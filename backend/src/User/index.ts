import { UserBase, UserProfile } from "@src/User/BaseEntitie"
import { ForUserRepo } from "@src/User/interfaces"


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