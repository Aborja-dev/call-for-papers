import { LoginInput, UserProfile, UserSesion } from "@/types/types"
class FetchAPiRequest {
    url: string
    config: any
    constructor(endpoint: string, config: any) {
        this.url = `${baseUrl}/${endpoint}`
        this.config = config
    }
    getConfig() {
        const method = this.config.method
        if (method === 'GET')  return this.configGETRequest()
        if (method === 'POST') return this.configPOSTRequest(this.config.body)
        if (method === 'PATCH') return this.configPATCHRequest(this.config.body)

    }
    private configGETRequest() {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    }

    private configPOSTRequest(body: any) {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        }
    }

    private configPATCHRequest(body: any) {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(body)
        }
    }
}
const baseUrl = "http://localhost:3000"
export const fetchLogin = (data: LoginInput): Promise<UserSesion> => {
    const req = new FetchAPiRequest('user/login', {
        body: data,
        method: 'POST'
    })
    return fetch(req.url, req.getConfig())
    .then(res => res.json())
}

export const fetchUserProfile = async (id: number): Promise<UserProfile> => {
    const response = await fetch(`${baseUrl}/user/${id}`)
    const data = await response.json()
    return data
}


export const fetchSearchUser = async (email: string) => {
    const res = await fetch(`${baseUrl}/user/recover`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email })
    })
    const data = await res.json()
    return data
}

export const fetchChangePassword = async (id: number, password: string) => {
    const res = await fetch(`${baseUrl}/user/${id}/recover`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ password })
    })
    return res
}

export const fetchRegister = async (data: any) => {
    const res = await fetch(`${baseUrl}/user/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res
}
