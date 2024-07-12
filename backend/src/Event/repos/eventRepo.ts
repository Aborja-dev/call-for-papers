import { prisma } from "@src/db/connection"
import { ForEventRepoManaging, IEventSchema } from "@src/Event/domain/interfaces"
import { EventBase } from "@src/Event/domain/types"



export class EventRepo implements ForEventRepoManaging {
    events: IEventSchema[] = []
    async create(event: Omit<EventBase, "id">): Promise<IEventSchema> {
        const newEvent = {
            ...event,
            id: this.events.length + 1,
            userId: event.organizer.id
        }
        this.events.push(newEvent)
        return {
            ...newEvent,
            userId: newEvent.organizer.id
        }
    }

    async getAllByUser({ userId }: { userId: number }): Promise<IEventSchema[]> {
        return this.events.filter(event => event.userId === userId)
    }

    async getById({ eventId }: { eventId: number }): Promise<IEventSchema | null> {
        return this.events.find(event => event.id === eventId) || null
    }

    async update({ eventId, updateData }: { eventId: number, updateData: Partial<EventBase> }): Promise<IEventSchema> {
        const event = this.events.find(event => event.id === eventId)!
        Object.assign(event, updateData)
        return event
    }

    async delete({ eventId }: { eventId: number }): Promise<void> {
        this.events = this.events.filter(event => event.id !== eventId)
    }
}

export class PrismaEventRepo implements ForEventRepoManaging {
    create = async (event: Omit<IEventSchema, "id">) => {
        const eventCreated = await prisma.event.create({ data: event })
        return eventCreated
    }
    getAllByUser = ({ userId }: { userId: number }) => {
        return prisma.event.findMany({ where: { userId } })
    }
    getById = ({ eventId }: { eventId: number }) => {
        return prisma.event.findUnique({ where: { id: eventId } })
    }
    update = async ({ eventId, updateData }: { eventId: number, updateData: Partial<EventBase> }) => {
        const event = await prisma.event.update({ 
            where: { id: eventId }, 
            data: updateData 
        })
        return event
    }
    destroy = async ({ eventId }: { eventId: number }) => {
        await prisma.event.delete({ where: { id: eventId } })
    }
}