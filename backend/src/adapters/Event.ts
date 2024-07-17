import { TypeEvent } from '../models/types/consts';
import { EventModel } from '../models/types/types';
import { EventRepository } from './../models/Event/repository';

import { ForEventRepositoryPort } from './types.d';
export class EventRepositoryDriver implements ForEventRepositoryPort {

    constructor(
        private readonly repository: EventRepository
    ) { }

    insert: ForEventRepositoryPort['insert'] = async (event) => {
        const typeEvent = event.typeEvent as string
        const status = event.status as string
        try {
            await this.repository.insert({
                ...event,
                typeEvent,
                status,
                endingDate: new Date(event.endingDate),
                startingDate: new Date(event.startingDate)
            })
        } catch (error) {
            throw error
        }
    }

    update: ForEventRepositoryPort['update'] = async ({ id, updateData }) => {
        try {
            await this.repository.update({
                id, updateData: {
                    ...updateData,
                    endingDate: updateData.endingDate ? new Date(updateData.endingDate) : undefined,
                    startingDate: updateData.startingDate ? new Date(updateData.startingDate) : undefined
                }
            })
        } catch (error) {
            throw error
        }
    }

    listAll: ForEventRepositoryPort['listAll'] = async () => {
        try {
            const events = await this.repository.listAll()
            return events.map(event => ({
                ...event,
                endingDate: event.endingDate.toISOString(),
                startingDate: event.startingDate.toISOString(),
                typeEvent: event.typeEvent as TypeEvent
            }))
        } catch (error) {
            throw error
        }
    }

    listByUser: ForEventRepositoryPort['listByUser'] = async (userId) => {
        try {
            const events = await this.repository.listByUser(userId)
            return events.map((event) => this.mapEvent(event))
        } catch (error) {
            throw error
        }
    }

    getById: ForEventRepositoryPort['getById'] = async (id, details = false) => {
        if (details) {
            try {
                const event = await this.repository.getDetails(id)
                if (!event) return null
                return this.mapEvent(event)
            } catch (error) {
                throw error
            }

        }
        if (!details) {
            try {
                const event = await this.repository.getById(id)
                if (!event) return null
                return this.mapEvent(event)
            } catch (error) {
                throw error
            }
        }
        return null
    }
    destroy: ForEventRepositoryPort['destroy'] = ({ id }: { id: number; }) => {
        try {
            return this.repository.destroy({ id })
        } catch (error) {
            throw error
        }
    };
    private mapEvent = (event: EventModel) => {
        return {
            ...event,
            endingDate: event.endingDate.toISOString(),
            startingDate: event.startingDate.toISOString(),
            typeEvent: event.typeEvent as TypeEvent
        }
    }
}