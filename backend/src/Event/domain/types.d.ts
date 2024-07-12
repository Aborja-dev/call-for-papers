import { UserBase } from "@src/User/BaseEntitie"

export interface EventBase {
    id: number
    name: string
    typeEvent: string
    startingDate: Date
    endingDate: Date
    organizer: UserBase
    status: string
}
export interface EventDetails extends EventBase {
    description: string
    // talks: Proposal []
    bannerUrl: string
    url: string
    location: string
    organizer: UserBase
    // proposalsStartindDate: Date[]
    // proposalsEndingDate: Date[]
    timezone: string
}

export interface DetailSchema {
    id: number
    description: string
    // talks: Proposal []
    bannerUrl: string
    url: string
    location: string
    // proposalsStartindDate: Date[]
    // proposalsEndingDate: Date[]
    timezone: string
}