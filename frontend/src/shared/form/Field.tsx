import React, { useState } from 'react'

const Field = ({ 
    handleChange, 
    value, 
    label, 
    name, 
    type }: {
        handleChange: (name: string, value: string) => void,
        value: string,
        label: string,
        name: string,
        type: string
    }) => {
    const  [_value, setValue] = useState(value)

    const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        handleChange(e.target.name, e.target.value)
    }
    return (
        <fieldset>
            <label htmlFor={name} className="block text-sm font-medium">{label}</label>
            <input type={type} id={name} name={name} value={_value} onChange={_handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </fieldset>
    )
}

export default Field
