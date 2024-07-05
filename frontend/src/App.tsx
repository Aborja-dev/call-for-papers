import { useEffect, useState } from "react"
const baseUrl = "http://localhost:3000"
const fetchApi = async (url: string) => {
  return await fetch(`${url}`).then((res) => res.json())
}

function App() {
  const [state, setState] = useState('')
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const data = await fetchApi(baseUrl)
    setState(JSON.stringify(data))
  }
  return (
    <>
    <header></header>
    <main className="mt-10 grid place-items-center">
      <h1 >Call for papers App</h1>
      
    </main>
    </>
  )
}

export default App
