import { UserSesion } from "@/types/types"
import { useState } from "react"

type Sesion = Omit<UserSesion, 'token'>
export const useSesion = () => {
    const [sesion, setSesion] = useState<Sesion | null>(null)
    const saveSesion = (data: UserSesion) => {
        const {token, ...sesion} = data
        saveToken(token)
        saveSesionInStorage(sesion as Sesion)
        setSesion(sesion)
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
        setSesion(null)
    }
    return {
        saveSesion,
        getSesion,
        clearSesion,
        sesion
    }
}

const saveSesionInStorage = (data: unknown) => {
    localStorage.setItem('user', JSON.stringify(data))
}

const saveToken = (token: UserSesion['token']) => {
    localStorage.setItem('token', token)
}