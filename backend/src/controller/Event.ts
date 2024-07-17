
import { Handler, Request } from "express";
import { prisma } from '@src/db/connection';
import { CreateEvent, UpdateEvent } from '@src/adapters/types';
import { EventService } from '@src/service/EventService';
import { EventRepositoryDriver } from '@src/adapters/Event';
import { EventRepository } from '@src/models/Event/repository';

const createService = () => {
    const repo = new EventRepository(prisma)
    const driver = new EventRepositoryDriver(repo);
    return new EventService(
        driver
    )
}
const service = createService();
export const EventController: Record<string, Handler> = {
    create: async (req: Request<{}, {}, CreateEvent>, res) => {
        const { body } = req
        try {
            await service.create(body);
            res.status(201).send();
        } catch (error) {
            res.status(400).send({ error, message: 'no se pudo crear el evento' });
        }
    },
    list: async (req, res) => {
        const id = Number(req.app.locals.user.id);
        try {
            await service.list({ userId: id });
            res.status(200).send();
        } catch (error) {
            res.status(400).send({ error, message: 'ocurrio un error' });
        }


    },
    update: async (req: Request<any, {}, UpdateEvent>, res) => {
        try {
            await service.update({ eventId: +req.params.eventId, updateData: req.body });
            res.status(200).end();
        } catch (error) {

        }
    },
    delete: async (req, res) => {
        try {
            await service.destroy({ eventId: +req.params.eventId });
            res.status(200).end()
        } catch (error) {
            res.status(400).send({ error, message: 'no se pudo borrar el evento' });
        }
    },
    getById: async (req, res) => {
        try {
            const event = await service.getById({ eventId: +req.params.eventId });
            res.status(200).json(event);
        } catch (error) {
            res.status(400).send({ error, message: 'no se pudo obtener el evento' });
        }
    }
}