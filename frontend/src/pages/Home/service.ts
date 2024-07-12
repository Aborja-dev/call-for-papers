// obtener token
export const getToken = () => {
    return localStorage.getItem('token')
}
const configBuilder = ({token, method, body}: {token: string, method: string, body?: any}) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: method,
        body
    }
}
// consfigurar request
export const fetchEvents = async () => {
    const URLBase = 'http://localhost:3000'
    const token = getToken()
    const config = configBuilder({token, method: 'GET'})
    const reponse = await fetch(`${URLBase}/event`, config)
    return await reponse.json()
}

export const fetchCreateEvent = async (data: any) => {
    const URLBase = 'http://localhost:3000'
    const token = getToken()
    const config = configBuilder({token, method: 'POST', body: JSON.stringify(data)})
    const reponse = await fetch(`${URLBase}/event`, config)
    return await reponse.json()
}
// configurar headers


// fetch
// servicio
export const EventService = {
    getEvents: async () => fetchEvents(),
    createEvent: async (data) => fetchCreateEvent(data) 
}

