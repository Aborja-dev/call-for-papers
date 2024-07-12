import { prisma } from './db/connection';
import { app } from '@src/app'
import { EventDetailsRepo } from '@src/Event/repos/EventDetailsRepo';
import { PrismaEventRepo } from '@src/Event/repos/eventRepo';
import { EventService } from '@src/Event/service'
import { title } from 'process';

(async () => {
    app.listen(3000)
    console.log('Listening on port 3000')
})()
