import { User } from "@prisma/client"
import { 
    type ForEventDetailsRepoManaging, 
    type ForEventManaging, 
    type ForEventRepoManaging } from "@src/Event/domain/interfaces"
import {type EventBase, type EventDetails } from "@src/Event/domain/types"

export class EventService implements ForEventManaging {
    constructor(
        private user: User,
        private repository: ForEventRepoManaging,
        private eventDetailsRepo: ForEventDetailsRepoManaging
    ) { }

    async create(event: Omit<EventDetails, "id">) {
        await this.repository.create({
            endingDate: new Date(event.endingDate),
            name: event.name,
            startingDate: new Date(event.startingDate),
            status: event.status,
            typeEvent: event.typeEvent,
            userId: this.user.id
        })
    }

    async list({ userId }: { userId: number }): Promise<EventBase[]> {
        const eventsFound = await this.repository.getAllByUser({ userId })
        return eventsFound.map(event => ({
            ...event,
            organizer: this.user
        }))
    }

    async getById({ eventId }: { eventId: number }): Promise<EventDetails | null> {
        const event = await this.repository.getById({ eventId })
        const details = await this.eventDetailsRepo.getById({ eventId })
        return { ...event, ...details, organizer: this.user } as any
    }

    async update({ eventId, updateData }: { eventId: number, updateData: Partial<EventBase> }): Promise<void> {
        await this.repository.update({ eventId, updateData })
    }

    async delete({ eventId }: { eventId: number }): Promise<void> {
        await this.repository.destroy({ eventId })
    }
}