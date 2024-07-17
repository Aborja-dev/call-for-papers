import { PrismaClient } from "@prisma/client"
import { EventDetailModel, EventModel } from "../types/types"
import { ForEventRepoManaging, InsertEventDetailSchema, InsertEventSchema, UpdateEventDetailSchema, UpdateEventSchema } from "./types"
import { Status, TypeEvent } from "../types/consts"




type ForInsert = InsertEventSchema & {detail: InsertEventDetailSchema}
type ForUpdate = Partial<UpdateEventSchema & {detail: Partial<UpdateEventDetailSchema>}>
type Detail = EventModel & {detail: EventDetailModel }

export class EventRepository implements ForEventRepoManaging <ForInsert, ForUpdate, Detail>{
    constructor(
        private readonly dbConnection: PrismaClient
    ) { }
    async insert(event: ForInsert): Promise<EventModel | Error | void> {
        try {
            const newEvent = await this.dbConnection.event.create({
                data: {
                    ...event,
                    detail: {
                        create: event.detail
                    }
                }
            })
            return {
                ...newEvent,
                typeEvent: newEvent.typeEvent as TypeEvent,
                status: newEvent.status as Status
            }
        } catch (error) {
            throw error
            return error as Error
        }
    }
    
    async update({ id, updateData }: { id: number, updateData: ForUpdate }): Promise<void | Error> {
        try {
            await this.dbConnection.event.update({
                where: {
                    id
                },
                data: {
                    ...updateData,
                    detail: {
                        update: updateData.detail
                    }
                }
            })
        } catch (error) {
            return error as Error
        }
    }

    async listAll(): Promise<EventModel[]> {
        return await this.dbConnection.event.findMany()
    }

    async listByUser(userId: number): Promise<EventModel[]> {
        return await this.dbConnection.event.findMany({
            where: {
                userId
            }
        })
    }

    async getById(id: number): Promise<EventModel | null> {
        return await this.dbConnection.event.findUnique({
            where: {
                id
            }
        })
    }

    async getDetails(id: number): Promise<Detail | null> {
        const result = await this.dbConnection.event.findUnique({
            where: {
                id
            },
            include: {
                detail: true
            }
        })
        if (!result || !result.detail) return null
        return {
            ...result,
            detail: result.detail}
    }

    async destroy({ id }: { id: number }): Promise<void> {
        try {
            await this.dbConnection.event.delete({
                where: {
                    id
                }
            })    
        } catch (error) {
            throw error
        }
        
    }

}

