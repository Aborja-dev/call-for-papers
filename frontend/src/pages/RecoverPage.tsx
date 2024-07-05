import { useSesion } from '@/hooks/useSesion'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Form } from 'react-router-dom'

enum states { 'DEFAULT', 'LOADING', 'ERROR', 'VALIDATED' }
type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void
const baseUrl = 'http://localhost:3000'
const fetchSearchUser = async (email: string) => {
  const res = await fetch(`${baseUrl}/user/recover`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ email })
  })
  const data = await res.json()
  return data
}

const fetchChangePassword = async (id: number, password: string) => {
  const res = await fetch(`${baseUrl}/user/${id}/recover`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ password })
  })
  return res
}

const RecoverPage = () => {
  const [state, setState] = useState('DEFAULT')
  const sesion = useSesion()
  const navigate = useNavigate()
  const submitHandlerSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const email = data.email as string
    const result = await fetchSearchUser(email)
    if (result) {
      setState('VALIDATED')
    }
  }

  const submitHandlerChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const password = data.password as string
    const user = sesion.getSesion()
    if (!user) return
    const result = await fetchChangePassword(user.id, password)
    if (result.ok) {
      navigate('/login')
    }
  }
  return (
    <div className='mt-12 '>
      <div className='w-1/2 mx-auto'>
        { state === 'DEFAULT' && <SearchUserForm submit={submitHandlerSearch} /> }
        { state === 'VALIDATED' && <ChangePasswordForm submit={submitHandlerChange} /> }
        <div className='mt-8 flex justify-around'>
          <button onClick={() => navigate(-1)}>Regresar</button>
        </div>
      </div>
    </div>
  )
}

const SearchUserForm = ({ submit }: { submit: SubmitHandler }) => {
  return (
    <Form onSubmit={submit}>
      <h1 className='text-3xl text-center'>Recuperar tu usuario</h1>
      <label htmlFor="email">Email</label>
      <input name='email' type="text" />
      <button type="submit">Buscar usuario</button>
    </Form>
  )
}

const ChangePasswordForm = ({ submit }: { submit: SubmitHandler }) => {
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const password = data.password as string
    const confirm = data.confirm as string
    if (password === confirm) {
      submit(e)
    }
  }
  return (
    <Form onSubmit={submitHandler}>
      <h1 className='text-3xl text-center'>Cambiar contraseña</h1>
      <label htmlFor="password">Nueva contraseña</label>
      <input name='password' type="text" />
      <label htmlFor="confirm">Nueva contraseña</label>
      <input name='confirm' type="text" />
      <button type="submit">Cambiar</button>
    </Form>
  )
}

export default RecoverPage
