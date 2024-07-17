import { EventRepository } from "./Event/repository"
import { ForEventRepositoryPort } from "./Event/types"
import { Role, TypeEvent } from "./types/consts"
import { EventModel } from "./types/types"
import { UserRepository } from "./User/repository"

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

interface ForRepositoryPort {
    insert: (event: CreateUser) => Promise<void>
    searchByEmail: (email: string) => Promise<UserType | null>
    update: ({ id, updateData }: { id: number, updateData: UpdateUser }) => Promise<void>
}

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

export class EventRepositoryDriver implements ForEventRepositoryPort {

    constructor(
        private readonly repository: EventRepository
    ) { }

    insert: ForEventRepositoryPort['insert'] = async (event) => {
        const typeEvent = event.typeEvent as string
        const status = event.status as string
        try {
            await this.repository.insert({
                ...event,
                typeEvent,
                status,
                endingDate: new Date(event.endingDate),
                startingDate: new Date(event.startingDate)
            })
        } catch (error) {
            throw error
        }
    }

    update: ForEventRepositoryPort['update'] = async ({ id, updateData }) => {
        try {
            await this.repository.update({
                id, updateData: {
                    ...updateData,
                    endingDate: updateData.endingDate ? new Date(updateData.endingDate) : undefined,
                    startingDate: updateData.startingDate ? new Date(updateData.startingDate) : undefined
                }
            })
        } catch (error) {
            throw error
        }
    }

    listAll: ForEventRepositoryPort['listAll'] = async () => {
        try {
            const events = await this.repository.listAll()
            return events.map(event => ({
                ...event,
                endingDate: event.endingDate.toISOString(),
                startingDate: event.startingDate.toISOString(),
                typeEvent: event.typeEvent as TypeEvent
            }))
        } catch (error) {
            throw error
        }
    }

    listByUser: ForEventRepositoryPort['listByUser'] = async (userId) => {
        try {
            const events = await this.repository.listByUser(userId)
            return events.map((event) => this.mapEvent(event))
        } catch (error) {
            throw error
        }
    }

    getById: ForEventRepositoryPort['getById'] = async (id, details = false) => {
        if (details) {
            try {
                const event = await this.repository.getDetails(id)
                if (!event) return null
                return this.mapEvent(event)
            } catch (error) {
                throw error
            }

        }
        if (!details) {
            try {
                const event = await this.repository.getById(id)
                if (!event) return null
                return this.mapEvent(event)
            } catch (error) {
                throw error
            }
        }
        return null
    }
    private mapEvent = (event: EventModel) => {
        return {
            ...event,
            endingDate: event.endingDate.toISOString(),
            startingDate: event.startingDate.toISOString(),
            typeEvent: event.typeEvent as TypeEvent
        }
    }
}