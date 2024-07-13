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

interface EventBasic {
    name: string
    type: TypeEvent | string
    start: string
    end: string
}
const EVENTS_TYPE = {
    'CONFERENCE': 'Conference',
    'WORKSHOP': 'Workshop',
    'SEMINAR': 'Seminar',
    'OTHER': 'Other'
} as const
type TypeEvent = typeof EVENTS_TYPE[keyof typeof EVENTS_TYPE]
const EVENTS_STATUS = {
    'ENVIADO': 'Enviado',
    'APROBADO': 'Aprobado',
    'RECHAZADO': 'Rechazado'
}
type Status = typeof EVENTS_STATUS[keyof typeof EVENTS_STATUS]
export interface EventDetails {
    description: string
    location: string
    url: string
    bannerUrl: string
    timezone: string
}
export interface NewEventInput extends EventBasic {
    status: Status
    details: EventDetails
}

export interface InsertEventSchema {
    name: string
    typeEvent: string
    startingDate: Date
    endingDate: Date
    status: string
    userId: number 
    detail: EventDetails
}