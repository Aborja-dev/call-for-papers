import { EditEvent } from '@/types/eventTypes'
import React from 'react'

interface Props {
    formData: EditEvent
    onSubmit: (data: EditEvent) => void
}

const EditEventForm: React.FC<Props> = ({formData, onSubmit}) => {
  return (
    <div>
      
    </div>
  )
}

export default EditEventForm
