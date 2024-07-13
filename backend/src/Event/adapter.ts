import { InsertEventSchema, NewEventInput } from "@src/Event/domain/types"


export const EventAdapter = {
    toInsert: (event: NewEventInput, userId: number): InsertEventSchema  => ({
        name: event.name,
        typeEvent: event.type,
        startingDate: new Date(event.start),
        endingDate: new Date(event.end),
        status: event.status,
        userId,
        detail: event.details
    })
}