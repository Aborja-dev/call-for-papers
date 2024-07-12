import { User } from '@prisma/client';
import { EventDetailsRepo } from './../Event/repos/EventDetailsRepo';
import {  PrismaEventRepo } from './../Event/repos/eventRepo';
import { EventService } from "@src/Event/service";
import { Handler } from "express";
import { prisma } from '@src/db/connection';

const eventRepo = new PrismaEventRepo();
const eventDetailsRepo = new EventDetailsRepo();

const createService = (user: User) => new EventService(
    user, 
    eventRepo, 
    eventDetailsRepo);

const getUser = async (req: any) => {
    const id = Number(req.app.locals.user.id);
    const user = await prisma.user.findUnique({ where: { id } });
    return user
}
export const EventController: Record<keyof EventService, Handler> = {
    create: async (req, res) => {
        const user = await getUser(req);
        if (user) {
            let service = createService(user);
            const created = await service.create(req.body);
            res.status(201).json(created);
        }
        // service = null as any
    },
    list: async (req, res) => {
        console.log(req.app.locals);
        const user = await getUser(req);
        if (user) {
            const service = createService(user);
            const events = await service.list({ userId: user.id })
            res.status(200).json(events);

        }

    },
    update: async (req, res) => {
        const user = await getUser(Number(req.body.user.id));
        if (user) {
            const service = createService(user);
            const updated = await service.update({ eventId: +req.params.eventId, updateData: req.body });
            res.status(200).json(updated);
        }
    },
    delete: async (req, res) => {
        const user = await getUser(Number(req.body.user.id));
        if (user) {
            const service = createService(user);
            const deleted = await service.delete({ eventId: +req.params.eventId });
            res.status(200).json(deleted);
        }
        
    },
    getById: async (req, res) => {
        const user = await getUser(Number(req.body.user.id));
        if (user) {
            const service = createService(user);
            const event = await service.getById({ eventId: +req.params.eventId });
            res.status(200).json(event);
        }
    }
}