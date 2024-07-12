import { useSesion } from '@/hooks/useSesion'
import EventsTable from '@/pages/Home/components/EventsTable'
import { EventService } from '@/pages/Home/service'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { getSesion } = useSesion()
  const sesion = getSesion()
  const [events, setEvents] = useState([])
  useEffect(() => {
    init()
  }, [])
  const init = async () => {
    const events = await EventService.getEvents()
    setEvents(events)
  }
  return (
    <>
      <div className='w-full'>
        <div className='flex gap-4 items-center'>
          <h2 className='m-0'>Welcome {sesion?.name}</h2>
          <Link className='hover:underline hover:text-blue-500' to='/profile'>Ver detalles</Link>
          <Link to={'/event/create'}>
            <button>Crear evento</button>
          </Link>
        </div>
        <div className='w-full p-5 mt-6'>
          <EventsTable events={events} />
        </div>
      </div>
    </>
  )
}

export default HomePage
