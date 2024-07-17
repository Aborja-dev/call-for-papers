import { useSesion } from '@/hooks/useSesion'
import EditEventForm from '@/pages/EditEvent/components/EditEventForm'
import { Event } from '@/service/API/api'
import { EditEvent, EventType } from '@/types/eventTypes'
import React from 'react'
import { useLoaderData } from 'react-router'

const EditEventPage: React.FC = () => {
  const data = useLoaderData()
  const { getSesion } = useSesion()
  const { details: event } = data as any

  console.log(event)
  
  const defaultValue: EditEvent = {
    start: event.startingDate,
    end: event.endingDate,
    status: event.status,
    location: event.location,
    description: event.description,
    bannerUrl: event.bannerUrl,
    url: event.url,
    timezone: event.timezone
  }
  const submitHandler = (data) => {
    Event.update({
      id: event.id,
      data: data
    })
  }
  return (
    <div>
      <EditEventForm formData={defaultValue} onSubmit={submitHandler} />
    </div>
  )
}

export default EditEventPage
