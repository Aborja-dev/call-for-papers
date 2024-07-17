import { Role, Status, TypeEvent } from "./consts"

export interface UserModel {
    id: number,
    name: string
    email: string
    password: string
    role: string
    createdAt: Date
    events?: EventModel[]
}

export interface EventModel {
    id: number
    name: string
    typeEvent: string
    startingDate: Date
    endingDate: Date
    status: string
    user?: UserModel
    userId: number
    detail?: EventDetailModel
}

export interface EventDetailModel {
    id: number
    description: string
    bannerUrl: string
    url: string
    location: string
    timezone: string
    event?: EventModel
    eventId: number
}