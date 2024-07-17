import { User } from '@prisma/client';
import { prisma } from './db/connection';
import { app } from '@src/app'
import { EventDetailsRepo } from '@src/Event/repos/EventDetailsRepo';
import { PrismaEventRepo } from '@src/Event/repos/eventRepo';
import { EventService } from '@src/Event/service'
import { title } from 'process';
import pc from "picocolors";
/* (async () => {
    app.listen(3000)
    console.log('Listening on port 3000')
})() */


(async () => {
    const detail = {
        bannerUrl: "www.url.com",
        description: "Un workshop sobre las ultimas tecnologias",
        location: "Argentina",
        timezone: "GMT+6",
        url: "ww.url.com",
    }
    const eventData = {
        endingDate: new Date("2024-07-15T00:00:00.000Z"),
        startingDate: new Date("2024-07-14T00:00:00.000Z"),
        status: "Aprobado",
        detail
    }
    const eventId = 1
    const eventRepo = new PrismaEventRepo();
    const result = await eventRepo.update({ eventId, updateData: eventData })
    if (result) console.log(pc.green('event updated'));
    
/*     const eventDetailsRepo = new EventDetailsRepo();
    const user = await prisma.user.findUnique({ where: { id: 1 } })
    const service = new EventService(
        user as User,
        eventRepo,
        eventDetailsRepo)
    const result = await service.getById({ eventId: 1 }) */
    //console.log('result', result);
})()