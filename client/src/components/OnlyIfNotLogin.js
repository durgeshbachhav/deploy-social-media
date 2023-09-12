import React from 'react'
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStorageManager'
import { Navigate, Outlet } from 'react-router-dom'

const OnlyIfNotLogin = () => {
     const user = getItem(KEY_ACCESS_TOKEN)
  return (
        user ? <Navigate to='/' />: <Outlet />
  )
}

export default OnlyIfNotLogin