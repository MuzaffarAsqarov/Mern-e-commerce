import React from 'react'
import { MdClose } from "react-icons/md";
import { Configs } from '../config/config';

const DisplayImage = ({img, onClose}) => {
  
  return (
    <div className='flex justify-center p-4 absolute top-0 w-full h-full bg-white'>
        <MdClose className='text-black absolute right-2 top-2 cursor-pointer box-content p-1 hover:bg-stone-300' onClick={onClose} />
        {(typeof(img) == 'string') ? 
          (
            <img src={`${Configs.BACKEND_URL}/images/${img}`} className='w-full h-full object-scale-down'/>
          ) :
          (
            <img src={URL.createObjectURL(img)} className='w-full h-full object-scale-down'/>
          )
        }
    </div>
  )
}

export default DisplayImage