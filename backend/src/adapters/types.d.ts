import { Role, Status, TypeEvent } from "../models/types/consts"
import { EventDetailModel } from "../models/types/types"

interface CreateUser {
    name: string
    email: string
    password: string
    role: Role
}

interface UpdateUser {
    name?: string
    password?: string
    role?: Role
}

interface UserType {
    id: number,
    name: string
    email: string
    password: string
    role: Role
    createdAt: Date
}

interface CreateEvent {
    name: string
    typeEvent: string
    startingDate: string
    endingDate: string
    status: Status
    userId: number
    detail: {
        description: string
        bannerUrl: string
        url: string
        location: string
        timezone: string
    }
}

interface UpdateEvent {
    name?: string
    startingDate?: string
    endingDate?: string
    status?: Status
    detail?: {
        id?: number
        description?: string
        bannerUrl?: string
        url?: string
        location?: string
        timezone?: string
    }
}

export interface EventType {
    id: number
    name: string
    typeEvent: TypeEvent
    startingDate: string
    endingDate: string
    status: string
    userId: number
    detail?: EventDetailModel
}

export interface ForEventRepositoryPort {
    insert: (event: CreateEvent) => Promise<EventType | Error | void>
    update: ({ id, updateData }: { id: number, updateData: UpdateEvent }) => Promise<void | Error>
    listAll: () => Promise<EventType[]>
    listByUser: (userId: number) => Promise<EventType[]>
    getById: (id: number, details?: boolean) => Promise<EventType | null>
    destroy: ({ id }: { id: number }) => Promise<void>
}


interface ForRepositoryPort {
    insert: (event: CreateUser) => Promise<void>
    searchByEmail: (email: string) => Promise<UserType | null>
    update: ({ id, updateData }: { id: number, updateData: UpdateUser }) => Promise<void>
}