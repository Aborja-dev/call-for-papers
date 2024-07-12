import { EventDisplay } from '@/pages/detailEvent/components/Display';
import React from 'react'
import { useLoaderData } from 'react-router'

const DetailEventPage = () => {
  const { details } = useLoaderData()
  console.log(details);
  
  return (
    <div>
      <EventDisplay event={details} />
    </div>
  )
}

export default DetailEventPage
