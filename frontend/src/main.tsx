import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/App'
import './index.css'
import './pico.css'
import LoginPage from '@/pages/LoginPage'
import RecoverPage from '@/pages/RecoverPage'
import ProfilePage, { profileLoader } from '@/pages/ProfilePage'
import HomePage from '@/pages/HomePage'
import RegisterPage from '@/pages/RegisterPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <HomePage />},
      {
        path: '/profile',
        loader: profileLoader,
        element: <ProfilePage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/recover',
    element: <RecoverPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
