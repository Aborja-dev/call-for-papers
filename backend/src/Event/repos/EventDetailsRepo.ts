import { ForEventDetailsRepoManaging } from "@src/Event/domain/interfaces";
import { EventDetails } from "@src/Event/domain/types";
const newEvent = {
    name: "event name",
    typeEvent: "type event",
    startingDate: new Date(),
    endingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    organizer: {
        id: 1,
        name: "name",
        email: "email",
        password: "password",
        role: "user" as "user" | "admin",
    },
    status: "status",
}
export class EventDetailsRepo implements ForEventDetailsRepoManaging {
    async getById({ eventId }: { eventId: number }): Promise<EventDetails> {
        return {
            ...newEvent,
            id: eventId,
            timezone: "timezone",
            bannerURl: "banner url",
            url: "url",
            location: "location",
            description: "description",
        }
    }
}