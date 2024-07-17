import { prisma } from "@src/db/connection";
import { ForEventDetailsRepoManaging } from "@src/Event/domain/interfaces";
import { UpdateEventDetailsSchema, UpdateEventSchema } from "@src/Event/domain/types";


export class EventDetailsRepo {
    async getById({ eventId }: { eventId: number }) {
         return await prisma.eventDetail.findUnique({
            where: {
                eventId: eventId
            }
         })
    }

    async update({ eventId, updateData }: { eventId: number, updateData: Partial<UpdateEventDetailsSchema> }) {
        return await prisma.eventDetail.update({
            where: {
                eventId: eventId
            },
            data: {
                bannerUrl: updateData?.bannerUrl,
                description: updateData?.description,
                location: updateData?.location,
                url: updateData?.url,
                timezone: updateData?.timezone
            }
        })
    }

}