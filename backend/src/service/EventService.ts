import { CreateEvent, EventType, ForEventRepositoryPort, ForRepositoryPort, UpdateEvent } from "@src/adapters/types"

export interface ForEventRepoManaging {
    create(event: CreateEvent): Promise<void>
    getAllByUser({ userId }: { userId: number }): Promise<EventType[]>
    getById({ eventId }: { eventId: number }): Promise<EventType | null>
    update({ eventId, updateData }: { eventId: number, updateData: UpdateEvent }): Promise<void>
    destroy({ eventId }: { eventId: number }): Promise<void>
}


export class EventService implements ForEventRepoManaging {
    constructor(
        private repository: ForEventRepositoryPort
    ) { }

    async create(event: CreateEvent): Promise<void> {
        await this.repository.insert(event)
    }

    async list({ userId }: { userId: number }): Promise<EventType[]> {
        const eventsFound = await this.repository.listByUser(userId)
        return eventsFound
    }

    async getById({ eventId }: { eventId: number }): Promise<EventType | null> {
        const eventFound = await this.repository.getById(eventId)
        if (!eventFound) return null
        return eventFound
    }

    async update({ eventId, updateData }: { eventId: number, updateData: UpdateEvent }): Promise<void> {
        await this.repository.update({ id: eventId, updateData })
    }

    async getAllByUser({ userId }: { userId: number }): Promise<EventType[]> {
        const eventsFound = await this.repository.listByUser(userId)
        return eventsFound
    }

    async destroy({ eventId }: { eventId: number }): Promise<void> {
        await this.repository.destroy({ id: eventId })
    }
}