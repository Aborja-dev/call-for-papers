import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FormComponent } from '@/types/globals';
import Field from '@/shared/form/Field';
import { EventBasic } from '@/types/eventTypes';
import Select from '@/shared/form/SelectField';

const EventBasicForm: React.FC<FormComponent> = ({ onSubmit }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<EventBasic>({
        name: '',
        type: '',
        end: '',
        start: '',
    });

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData)
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Nombre del Evento" name="name" type="text" value={formData.name} handleChange={handleChange} />
            <Select label="Tipo de Evento" name="type" value={formData.type} onChange={handleChange} 
            options={[
                { value: 'Conferencia', label: 'Conferencia' },
                { value: 'Taller', label: 'Taller' },
                { value: 'Workshop', label: 'Workshop' },
            ]} />
            <div className='flex gap-5'>
                <Field label="Fecha de Inicio" name="start" type="date" value={formData.start} handleChange={handleChange} />
                <Field label="Fecha de Fin" name="end" type="date" value={formData.end} handleChange={handleChange} />
            </div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Siguiente
            </button>
            <button onClick={() => navigate(-1)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Volver
            </button>
        </form>
    );
};

export default EventBasicForm;