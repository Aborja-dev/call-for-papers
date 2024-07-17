interface ConfigAppRequest {
    headers?: {[key: string]: string}
    method?: string
    body?: any
}

export class AppRequest {
    baseUrl: string
    config!: ConfigAppRequest
    constructor (baseURl: string) {
        this.baseUrl = baseURl
        this.config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    fetch (url: string) {
        return fetch(`${this.baseUrl}${url}`, this.config)
    }
    post <B>(body:B) {
        this.config = {
            ...this.config,
            method: 'POST',
            body: JSON.stringify(body)
        }
        return this
    } 
    get () {
        this.config = {
            ...this.config,
            method: 'GET'
        }
        return this
    }
    patch <B>(body:B) {
        this.config = {
            ...this.config,
            method: 'PATCH',
            body: JSON.stringify(body)
        }
        return this
    }
}

export class AppRequestWithToken extends AppRequest {
    constructor (baseURl: string, token: string) {
        super(baseURl)
        this.config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    }
}
