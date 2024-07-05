import { LoginInput } from '@/types/types'
import React from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
const baseUrl = "http://localhost:3000"
const fetchLogin = (data: LoginInput) => {
    return fetch(`${baseUrl}/user/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
}



const LoginPage = () => {
    const navigate = useNavigate()
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))
        const body: LoginInput = {
            email: data.email as string,
            password: data.password as string
        }
        const result = await fetchLogin(body)
        saveSesionInStorage(result)
        saveToken(result.token)
        navigate('/')
    }
  return (
    <div className='mt-12 '>
    <div className='w-1/2 mx-auto'>
      <Form onSubmit={submitHandler}>
        <h1 className='text-3xl text-center'>login</h1>
        <label htmlFor="email">Email</label>
        <input name='email' type="text" />
        <label htmlFor="password">Password</label>
        <input name='password' type="password" />
        <button type="submit">Login</button>
      </Form>
      <div className='mt-8 flex justify-around'>
        <Link to='/recover'>Forgot Password</Link>
        <Link to='/register'>Register</Link>
      </div>
    </div>
    </div>
  )
}

export default LoginPage
