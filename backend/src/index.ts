import { prisma } from './db/connection';
import { app } from '@src/app'
import { EventDetailsRepo } from '@src/Event/repos/EventDetailsRepo';
import { PrismaEventRepo } from '@src/Event/repos/eventRepo';
import { EventService } from '@src/Event/service'
import { title } from 'process';

/* (async () => {
    app.listen(3000)
    console.log('Listening on port 3000')
})()
 */

(async () => {
    const eventRepo = new PrismaEventRepo()
    const detailsRepo = new EventDetailsRepo()
    const user = await prisma.user.findFirst()
    const user2 = await prisma.user.findUnique({
        where: { id: 2 }
    })
    if (user && user2) {
        const service = new EventService(
            user,
            eventRepo,
            detailsRepo
        )
        await service.update({ eventId: 1, updateData: { name: 'test' } })
        await service.delete({ eventId: 5 })
        
    }
})()