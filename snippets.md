class AppRequest {
    baseUrl: string
    config: any
    constructor (baseURl: string) {
        this.baseUrl = baseURl
    }
    fetch (url: string) {
        return fetch(`${this.baseUrl}${url}`, this.config)
    }
    post <B>(body:B) {
        this.config = {
            method: 'POST',
            body: body
        }
        return this
    } 
}

const request = new AppRequest('http://localhost:3000')
request.post<boolean>(true).fetch('/users')

type Item<T> = {
    id: number
} & T