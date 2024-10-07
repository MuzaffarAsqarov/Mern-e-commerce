import { CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-white'>
        <CircularProgress />
    </div>
  )
}

export default Loading