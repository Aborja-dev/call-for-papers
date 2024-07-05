import { fetchUserProfile } from '@/service/fetchApi'
import { UserProfile } from '@/types/types'
import React, { useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router'


export const profileLoader = async () => {
  const user = JSON.parse(localStorage.getItem('user') as string)
  if (!user) return { profile: null }
  const id = user.id
  const profile = await fetchUserProfile(id)
  return { profile }
}

const ProfilePage = () => {
  const { profile } = useLoaderData() as { profile: UserProfile | null }
  const navigate = useNavigate()
  useEffect(() => {
    if (!profile) navigate('/login')
  }, [profile, navigate])
  return (
    <div>
      <h1>Profile</h1>
      <p>{profile?.name}</p>
      <p>{profile?.email}</p>
      <p>{profile?.role}</p>
      <p>{profile?.adress}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default ProfilePage
