import { UserSesion } from "@/types/types"

type Sesion = Omit<UserSesion, 'token'>
export const useSesion = () => {
    const saveSesion = (data: UserSesion) => {
        const {token, ...sesion} = data
        saveToken(token)
        saveSesionInStorage(sesion as Sesion)
    }
    const getSesion = (): Sesion | null => {
        const user = localStorage.getItem('user')
        if (user) {
            return (JSON.parse(user))
        }
        return null
    }   
    const clearSesion = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
    return {
        saveSesion,
        getSesion,
        clearSesion
    }
}

const saveSesionInStorage = (data: unknown) => {
    localStorage.setItem('user', JSON.stringify(data))
}

const saveToken = (token: UserSesion['token']) => {
    localStorage.setItem('token', token)
}