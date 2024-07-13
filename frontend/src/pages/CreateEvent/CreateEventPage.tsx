import { useSesion } from '@/hooks/useSesion'
import EventBasicForm from '@/pages/CreateEvent/components/CreateEventForm'
import { DetailEventForm } from '@/pages/CreateEvent/components/EventDetailForm'
import { Event } from '@/service/API/api'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const CreateEventPage:React.FC = () => {
  const { getSesion } = useSesion()
  const navigate = useNavigate()
  const [event, setEvent] = useState<EventType>({
    name: '',
    details: {
      bannerUrl: '',
      description: '',
      location: '',
      timezone: '',
      url: ''
    },
    type: '',
    end: '',
    start: '',
    status: ''
  })
  const [step, setStep] = useState<number>(1)
  const submitHandler = async (detail: EventDetails) => {
    const user = getSesion()
    if (!user) return
    const newEvent: EventType = {
      ...event,
      status: 'ENVIADO',
      details: detail
    }
    Event.create(newEvent)
    navigate(-1)
  }
  const submitEventBasicHandler= (data: unknown) => {
    setEvent(() => ({ ...event, ...data as EventBasic }))
    setStep(2)
  }
  return (
    <div>
      {
        step === 1 && (
          <EventBasicForm onSubmit={submitEventBasicHandler} />
        )
      }
      {
        step === 2 && (
          <DetailEventForm onSubmit={submitHandler} />
        )
      }
    </div>
  )
}

export default CreateEventPage

