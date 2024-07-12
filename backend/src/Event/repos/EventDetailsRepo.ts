import { prisma } from "@src/db/connection";
import { ForEventDetailsRepoManaging } from "@src/Event/domain/interfaces";


export class EventDetailsRepo implements ForEventDetailsRepoManaging {
    async getById({ eventId }: { eventId: number }) {
         return await prisma.eventDetail.findUnique({
            where: {
                eventId: eventId
            }
         })
    }
}