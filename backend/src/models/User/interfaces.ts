import { UserModel } from "../types/types"

export interface IUserRepository <TInsert, TUpdate>{
    insert(user: TInsert): Promise<void >
    searchByEmail(email: string): Promise<UserModel  | null>
    update({ id, updateData }: { id: number, updateData: TUpdate }): Promise<void >
}