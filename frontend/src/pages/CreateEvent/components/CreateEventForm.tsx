import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FormComponent } from '@/types/globals';

const EventBasicForm: React.FC<FormComponent> = ({ onSubmit }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<EventBasic>({
        name: '',
        type: '',
        end: '',
        start: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData)
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium">Nombre del Evento</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
                <label htmlFor="typeEvent" className="block text-sm font-medium">Tipo de Evento</label>
                <select id="typeEvent" name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Seleccione...</option>
                    {/* Aquí puedes agregar opciones de tipos de eventos */}
                    <option value="conferencia">Conferencia</option>
                    <option value="seminario">Seminario</option>
                    <option value="conferencia">Workshop</option>
                    {/* Más opciones si es necesario */}
                </select>
            </div>
            <div className='flex gap-5'>
                <div className='w-full'>
                    <label htmlFor="startDate" className="block text-sm font-medium">Fecha de Inicio</label>
                    <input type="date" id="startDate" name="start" value={formData.start} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>
                <div className='w-full'>
                    <label htmlFor="endDate" className="block text-sm font-medium">Fecha de Fin</label>
                    <input type="date" id="endDate" name="end" value={formData.end} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>
            </div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Siguiente
            </button>

            <button onClick={() => navigate(-1)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                volver
            </button>
        </form>
    );
};

export default EventBasicForm;