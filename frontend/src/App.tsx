import { useEffect, useState } from "react"

const fetchApi = async (url: string) => {
  return await fetch(`${url}`).then((res) => res.json())
}

function App() {
  const [state, setState] = useState('')
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const data = await fetchApi('http://localhost:3000')
    setState(JSON.stringify(data))
  }
  return (
    <>
      <h1 >Hello, World !</h1>
      <p >{state}</p>
    </>
  )
}

export default App
