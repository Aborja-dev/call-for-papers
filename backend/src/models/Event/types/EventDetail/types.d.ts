
export interface InsertEventDetailSchema {
    description: string
    bannerUrl: string
    url: string
    location: string
    timezone: string
    eventId?: number
}

export interface UpdateEventDetailSchema {
    bannerUrl: string
    description: string
    location: string
    timezone: string
    url: string
}