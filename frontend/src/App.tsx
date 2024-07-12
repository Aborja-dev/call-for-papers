import { useSesion } from "@/hooks/useSesion"
import Header from "@/shared/Header"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

function App() {
  const navigate = useNavigate()
  const { getSesion } = useSesion()
  useEffect(() => {
    const user = getSesion()
    if (!user) navigate('/login')
  }, [])
  return (
    <>

      <Header />
      <main className="mt-10 grid place-items-start w-4/5 mx-auto">
      <div className="w-full">
        <Outlet />
      </div>
      </main>
    </>
  )
}

export default App
