import { Status, TypeEvent } from "../../types/consts"


export interface InsertEventSchema {
    name: string
    typeEvent: string
    startingDate: Date
    endingDate: Date
    status: string
    userId: number
}



export interface UpdateEventSchema {
    status?: string
    endingDate?: Date
    startingDate?: Date
}
