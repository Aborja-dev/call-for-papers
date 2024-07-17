import { User } from "@prisma/client"
import { EventAdapter } from "@src/Event/adapter"
import { 
    type ForEventDetailsRepoManaging,  
    type ForEventRepoManaging } from "@src/Event/domain/interfaces"
import {EditEventInput, NewEventInput, type EventBase, type EventDetails } from "@src/Event/domain/types"

export class EventService {
    constructor(
        private user: User,
        private repository: ForEventRepoManaging,
        private eventDetailsRepo: ForEventDetailsRepoManaging
    ) { }

    async create(event: NewEventInput): Promise<void | Error> {
        const insertData = EventAdapter.toInsert(event, this.user.id)
        try {
            await this.repository.create(insertData)
        } catch (error) {
            return error as Error
        }
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

    async update({ eventId, updateData }: { eventId: number, updateData: Partial<EditEventInput> }) {
        const _updateData = EventAdapter.toUpdate(updateData)
        await this.repository.update({ eventId, updateData: _updateData })
    }

    async delete({ eventId }: { eventId: number }): Promise<void> {
        await this.repository.destroy({ eventId })
    }
}