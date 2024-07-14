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
export interface EventType extends EventBasic {
    status: Status
    details: EventDetails
}

export interface EditEvent {
    start: string
    end: string
    location: string
    description: string
    bannerUrl: string
    url: string
    timezone: string
    status: Status
}