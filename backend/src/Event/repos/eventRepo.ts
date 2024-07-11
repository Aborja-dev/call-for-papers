import { ForEventRepoManaging } from "@src/Event/domain/interfaces"
import { EventBase } from "@src/Event/domain/types"

export class EventRepo implements ForEventRepoManaging {
    events: EventBase[] = []
    async create(event: Omit<EventBase, "id">): Promise<EventBase> {
        this.events.push({
            ...event,
            id: this.events.length + 1,
        })
        return this.events[this.events.length - 1]
    }

    async getAllByUser({ userId }: { userId: number }): Promise<EventBase[]> {
        return this.events.filter(event => event.organizer.id === userId)
    }

    async getById({ eventId }: { eventId: number }): Promise<EventBase> {
        return this.events.find(event => event.id === eventId)!
    }

    async update({ eventId, updateData }: { eventId: number, updateData: Partial<EventBase> }): Promise<EventBase> {
        const event = this.events.find(event => event.id === eventId)!
        Object.assign(event, updateData)
        return event
    }

    async delete({ eventId }: { eventId: number }): Promise<void> {
        this.events = this.events.filter(event => event.id !== eventId)
    }
}