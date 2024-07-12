import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const CreateEventForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        typeEvent: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a un servidor
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
                <select id="typeEvent" name="typeEvent" value={formData.typeEvent} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Seleccione...</option>
                    {/* Aquí puedes agregar opciones de tipos de eventos */}
                    <option value="técnico">Técnico</option>
                    <option value="social">Social</option>
                    {/* Más opciones si es necesario */}
                </select>
            </div>
            <div className='flex gap-5'>
                <div className='w-full'>
                    <label htmlFor="startDate" className="block text-sm font-medium">Fecha de Inicio</label>
                    <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>
                <div className='w-full'>
                    <label htmlFor="endDate" className="block text-sm font-medium">Fecha de Fin</label>
                    <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                </div>
            </div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Crear Evento
            </button>

            <button onClick={() => navigate(-1)} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                volver
            </button>
        </form>
    );
};

export default CreateEventForm;