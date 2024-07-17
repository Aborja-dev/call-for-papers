import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/App'
import './index.css'
import './pico.css'
import LoginPage from '@/pages/LoginPage'
import RecoverPage from '@/pages/RecoverPage'
import ProfilePage, { profileLoader } from '@/pages/ProfilePage'
import HomePage from '@/pages/Home/HomePage'
import RegisterPage from '@/pages/RegisterPage'
import { MainLayout } from '@/layouts/main'
import CreateEventPage from '@/pages/CreateEvent/CreateEventPage'
import DetailEventPage from '@/pages/detailEvent/page'
import { pageLoader } from '@/pages/detailEvent/loader'
import EditEventPage from '@/pages/EditEvent/page'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, element:
          <MainLayout>
            <HomePage />
          </MainLayout>
      },
      {
        path: '/profile',
        loader: profileLoader,
        element: <ProfilePage />
      },
      {
        path: '/event/create',
        element: <CreateEventPage />
      },
      {
        path: '/event/:id',
        element: <DetailEventPage />,
        loader: pageLoader
      },
      {
        path: '/edit/:id',
        element: <EditEventPage />,
        loader: pageLoader
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
