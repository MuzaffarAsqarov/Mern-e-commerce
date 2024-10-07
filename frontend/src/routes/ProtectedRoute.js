import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {

    const location = useLocation()
    const storegeData = JSON.parse(localStorage.getItem('user_data'))


  return (
    storegeData ? <Outlet/> : <Navigate to={'/login'} state={{from: location}}/>
  )
}

export default ProtectedRoute