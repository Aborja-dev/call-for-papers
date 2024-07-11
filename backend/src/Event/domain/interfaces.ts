import { EventBase, EventDetails } from "@src/Event/domain/types"

export interface ForEventRepoManaging {
    create(event: Omit<EventBase, "id">): Promise<EventBase>
    getAllByUser({ userId }: { userId: number }): Promise<EventBase[]>
    getById({ eventId }: { eventId: number }): Promise<EventBase>
    update({ eventId, updateData }: { eventId: number, updateData: Partial<EventBase> }): Promise<EventBase>
    delete({ eventId }: { eventId: number }): Promise<void>
}

export interface ForEventDetailsRepoManaging {
    getById({ eventId }: { eventId: number }): Promise<EventDetails>;
}

export interface ForEventManaging {
    create(event: Omit<EventDetails, "id">): Promise<void>
    list({ userId }: { userId: number }): Promise<EventBase[]>
    getById({ eventId }: { eventId: number }): Promise<EventDetails>
    update({ eventId, updateData }: { eventId: number, updateData: Partial<EventBase> }): Promise<EventBase>
    delete({ eventId }: { eventId: number }): Promise<void>
}