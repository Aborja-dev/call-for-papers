import React from 'react'
import { useNavigate } from 'react-router'
import Field from '@/shared/form/Field'
import Select from '@/shared/form/SelectField'
import { type EditEvent } from '@/types/eventTypes'
import { EVENTS_STATUS } from '@/types/consts'

interface Props {
  formData: EditEvent
  onSubmit: (data: EditEvent) => void
}

const EditEventForm: React.FC<Props> = ({ formData, onSubmit }) => {
  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget)) as Partial<EditEvent>
    onSubmit(values as EditEvent)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Field label="Description" name="description" type="text" value={formData.description} handleChange={() => { }} />
      <div className='flex gap-5'>
        <Field label="Fecha de Inicio" name="start" type="date" value={formData.start} handleChange={() => { }} />
        <Field label="Fecha de Fin" name="end" type="date" value={formData.end} handleChange={() => { }} />
      </div>
      <Select label="Status" name="status" value={formData.status} onChange={() => { }}
        options={[
          { value: EVENTS_STATUS.ENVIADO, label: 'Enviado' },
          { value: EVENTS_STATUS.APROBADO, label: 'Aprobado' },
          { value: EVENTS_STATUS.RECHAZADO, label: 'Rechazado' },
        ]} />
      <Field label="Banner URL" name="bannerUrl" type="text" value={formData.bannerUrl} handleChange={() => { }} />
      <Field label="URL" name="url" type="text" value={formData.url} handleChange={() => { }} />
      <div className='flex gap-5 w-full justify-between'>
        <Field label="Location" name="location" type="text" value={formData.location} handleChange={() => { }} />
        <Field label="Timezone" name="timezone" type="text" value={formData.timezone} handleChange={() => { }} />
      </div>
      <div className='w-full flex gap-5'>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        <button onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default EditEventForm
