import { useSesion } from "@/hooks/useSesion"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const sesion = useSesion()
    const navigate = useNavigate()

    useEffect(() => {
        if (!sesion.getSesion()) {
            navigate('/login')
        }
    }, [sesion, navigate])
    return (
        <>
            <div>
                {children}
            </div>
        </>
    )
}