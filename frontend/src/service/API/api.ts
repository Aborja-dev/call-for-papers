import { AppRequestWithToken } from "@/service/API/requestBuilder"
const URLBase = 'http://localhost:3000'
const token = localStorage.getItem('token') as string
export const Event = {
    create: async (data: EventType) => {
        const request = new AppRequestWithToken(URLBase, token)
        return await request.post(data).fetch('/event')
    }
}