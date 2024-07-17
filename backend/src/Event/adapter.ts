import { EditEventInput, InsertEventSchema, NewEventInput, UpdateEventDetailsSchema, UpdateEventSchema } from "@src/Event/domain/types"


export const EventAdapter = {
    toInsert: (event: NewEventInput, userId: number): InsertEventSchema  => ({
        name: event.name,
        typeEvent: event.type,
        startingDate: new Date(event.start),
        endingDate: new Date(event.end),
        status: event.status,
        userId,
        detail: event.details
    }),
    toUpdate: (event: Partial<EditEventInput>): Partial<UpdateEventSchema>  => ({
        endingDate: new Date(event.end as string),
        startingDate: new Date(event.start as string),
        status: event.status,
    }),

}

export const EventdetailAdapter = {
    toUpdate: (event: Partial<EditEventInput>): Partial<UpdateEventDetailsSchema>  => ({
        description: event.description,
        location: event.location,
        bannerUrl: event.bannerUrl,
        url: event.url,
        timezone: event.timezone
    })
}
