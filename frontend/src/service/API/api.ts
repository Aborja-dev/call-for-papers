import { AppRequestWithToken } from "@/service/API/requestBuilder"
import { EditEvent, EventType } from "@/types/eventTypes"
const URLBase = 'http://localhost:3000'
const token = localStorage.getItem('token') as string
export const Event = {
    create: async (data: EventType) => {
        const request = new AppRequestWithToken(URLBase, token)
        return await request.post<EventType>(data).fetch('/event')
    },
    update: async ({id, data}: { id: number, data: EditEvent }) => {
        const request = new AppRequestWithToken(URLBase, token)
        return await request.patch<EditEvent>(data).fetch(`/event/${id}`)
    }
}