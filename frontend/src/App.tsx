import { useSesion } from "@/hooks/useSesion"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

function App() {
const navigate = useNavigate()
const { clearSesion, getSesion } = useSesion()
useEffect(() => {
  const user = getSesion()
  if (!user) navigate('/login')
}, [])
return (
  <>
    <header>
      <button onClick={ () => {
        clearSesion()
        navigate('/login')
      }}>Logout</button>
    </header>
    <main className="mt-10 grid place-items-center">
      <h1 >Call for papers App</h1>
      <Outlet />
    </main>
  </>
)
}

export default App
