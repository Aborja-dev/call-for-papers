import { useSesion } from '@/hooks/useSesion'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { getSesion } = useSesion()
  const sesion = getSesion()
  return (
    <div>
      <h2>Welcome {sesion?.name}</h2>
      <Link to='/profile'>Ver detalles</Link>
    </div>
  )
}

export default HomePage
