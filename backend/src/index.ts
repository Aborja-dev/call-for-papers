import { User } from '@prisma/client';
import { prisma } from './db/connection';
import { app } from '@src/app'
import { EventDetailsRepo } from '@src/Event/repos/EventDetailsRepo';
import { PrismaEventRepo } from '@src/Event/repos/eventRepo';
import { EventService } from '@src/Event/service'
import { title } from 'process';
const eventRepo = new PrismaEventRepo();
const eventDetailsRepo = new EventDetailsRepo();
(async () => {
    /* const user = await prisma.user.findUnique({ where: { id: 1 } })
    const service = new EventService(
        user as User, 
        eventRepo, 
        eventDetailsRepo)
        const result = await service.getById({eventId: 1})
        console.log('result', result);     */
    app.listen(3000)
    console.log('Listening on port 3000')
})()
