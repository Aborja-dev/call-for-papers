import { useSesion } from '@/hooks/useSesion'
import CreateEventForm from '@/pages/CreateEvent/components/CreateEventForm'
import { EventService } from '@/pages/Home/service'
import React from 'react'
import { useNavigate } from 'react-router'

interface FormEvent {
    name: string
    typeEvent: string // select 3 options
    startDate: string // date
    endDate: string // date
}

const CreateEventPage = () => {
    const { getSesion } = useSesion()
    const navigate = useNavigate()
  const submitHandler = async (data) => {
    const user = getSesion()
    if(user) {
        const newEvent = {
            status: 'ENVIADO',
            startingDate: data.startDate,
            endingDate: data.endDate,
            userId: user.id,
            name: data.name,
            typeEvent: data.typeEvent
        }
        await EventService.createEvent(newEvent)
        navigate(-1)
    }
  }
  return (
    <div>
      <CreateEventForm onSubmit={submitHandler} />
    </div>
  )
}

export default CreateEventPage

