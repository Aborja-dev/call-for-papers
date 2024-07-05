import { fetchRegister } from '@/service/fetchApi'
import React from 'react'
import { useNavigate } from 'react-router'
import { Form } from 'react-router-dom'

type RegisterInput = {
    name: string
    email: string
    password: string
}
const RegisterPage = () => {
  const navigate = useNavigate()
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const body: RegisterInput = {
      name: data.name as string,
      email: data.email as string,
      password: data.password as string
    }
    const result = await fetchRegister(body)
    if (result.ok) {
      navigate('/login')
    }
  }
  return (
    <div className='mt-12 '>
    <div className='w-1/2 mx-auto'>
      <Form onSubmit={submitHandler}>
        <h1 className='text-3xl text-center'>Create User</h1>
        <label htmlFor="name">Nombre</label>
        <input name='name' type="text" />
        <label htmlFor="email">Email</label>
        <input name='email' type="text" />
        <label htmlFor="password">Password</label>
        <input name='password' type="password" />
        <button type="submit">Crear usuario</button>
      </Form>
      <div className='mt-8 flex justify-around'>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
    </div>
  )
}

export default RegisterPage
