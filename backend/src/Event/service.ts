import { 
    type ForEventDetailsRepoManaging, 
    type ForEventManaging, 
    type ForEventRepoManaging } from "@src/Event/domain/interfaces"
import { type EventBase, type EventDetails } from "@src/Event/domain/types"

export class EventService implements ForEventManaging {
    constructor(
        private repository: ForEventRepoManaging,
        private eventDetailsRepo: ForEventDetailsRepoManaging
    ) { }

    async create(event: Omit<EventDetails, "id">) {
        await this.repository.create(event)
    }

    async list({ userId }: { userId: number }): Promise<EventBase[]> {
        const eventsFound = await this.repository.getAllByUser({ userId })
        return eventsFound.map(event => ({
            id: event.id,
            name: event.name,
            typeEvent: event.typeEvent,
            startingDate: new Date(event.startingDate),
            endingDate: new Date(event.endingDate),
            status: event.status,
            organizer: event.organizer
        }))
    }

    async getById({ eventId }: { eventId: number }): Promise<EventDetails> {
        const event = this.repository.getById({ eventId })
        const details = await this.eventDetailsRepo.getById({ eventId })
        return { ...details }
    }

    async update({ eventId, updateData }: { eventId: number, updateData: Partial<EventBase> }): Promise<EventBase> {
        return this.repository.update({ eventId, updateData })
    }

    async delete({ eventId }: { eventId: number }): Promise<void> {
        await this.repository.delete({ eventId })
    }
}