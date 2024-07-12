import { useSesion } from '@/hooks/useSesion'
import { useNavigate } from 'react-router'
const Header = () => {
    const { clearSesion } = useSesion()
    const navigate = useNavigate()
    return (
        <header className='flex justify-between p-5'>
            <h1 >Call for papers App</h1>
            <button onClick={() => {
                clearSesion()
                navigate('/login')
            }}>Logout</button>
        </header>
    )
}

export default Header
