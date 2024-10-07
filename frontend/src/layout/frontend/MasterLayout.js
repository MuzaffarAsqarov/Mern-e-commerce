import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { AuthProvider } from '../../context/AuthContext'
import { CountCardProvider } from '../../context/countContext'


const MasterLayout = () => {
  
  return (
    <div>
      <AuthProvider>
        <CountCardProvider>
          <Header />
          <Outlet />
          <Footer />
        </CountCardProvider>
      </AuthProvider>
    </div>
  )
}

export default MasterLayout