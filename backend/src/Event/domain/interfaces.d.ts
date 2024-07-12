import { EventBase, EventDetails } from "@src/Event/domain/types"
export interface IEventSchema{
    id: number;
    name: string;
    typeEvent: string;
    startingDate: Date;
    endingDate: Date;
    status: string;
    userId: number;
}
export interface ForEventRepoManaging {
    create(event: Omit<IEventSchema, "id">): Promise<IEventSchema>
    getAllByUser({ userId }: { userId: number }): Promise<IEventSchema[]>
    getById({ eventId }: { eventId: number }): Promise<IEventSchema | null>
    update({ eventId, updateData }: { eventId: number, updateData: Partial<EventBase> }): Promise<IEventSchema>
    destroy({ eventId }: { eventId: number }): Promise<void>
}

export interface ForEventDetailsRepoManaging {
    getById({ eventId }: { eventId: number }): Promise<EventDetails>;
}

export interface ForEventManaging {
    create(event: Omit<EventDetails, "id">): Promise<void>
    list({ userId }: { userId: number }): Promise<EventBase[]>
    getById({ eventId }: { eventId: number }): Promise<EventDetails>
    update({ eventId, updateData }: { eventId: number, updateData: Partial<EventBase> }): Promise<void>
    delete({ eventId }: { eventId: number }): Promise<void>
}