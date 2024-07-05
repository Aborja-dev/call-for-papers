import { UserSesion } from "@/types/types"
import { useState } from "react"

type Sesion = Omit<UserSesion, 'token'>
export const useSesion = () => {
    const [sesion, setSesion] = useState<Sesion | null>(null)
    const saveSesion = (data: UserSesion) => {
        const {token, ...sesion} = data
        saveToken(token)
        saveSesionInStorage(sesion)
        setSesion(sesion)
    }
    const getSesion = (): Sesion | null => {
        const user = localStorage.getItem('user')
        if (user) {
            return (JSON.parse(user))
        }
        return null
    }   
    return {
        saveSesion,
        getSesion,
        sesion
    }
}

const saveSesionInStorage = (data: any) => {
    localStorage.setItem('user', JSON.stringify(data))
}

const saveToken = (token: UserSesion['token']) => {
    localStorage.setItem('token', token)
}