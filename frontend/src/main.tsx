import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/App'
import './index.css'
import './pico.css'
import LoginPage from '@/pages/LoginPage'
import RecoverPage from '@/pages/RecoverPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/profile',
        element: <div>profile</div>
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
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
