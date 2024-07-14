import React from 'react'

const Select = ({
    label, 
    value, 
    onChange, 
    name,
    options
}: {
        label: string,
        value: string,
        onChange: (name: string, value: string) => void,
        name: string,
        options: {value: string, label: string}[]
    }) => {
        const [_value, setValue] = React.useState(value)
        const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
            onChange(e.target.name, e.target.value)
            setValue(e.target.value)
        }
    return (
        <fieldset>
            <label htmlFor="typeEvent" className="block text-sm font-medium">{label}</label>
            <select 
            id={name} 
            name={name} 
            value={_value} 
            onChange={changeHandler} 
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Seleccione...</option>
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </fieldset>
    )
}


export default Select
