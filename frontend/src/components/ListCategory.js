import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Configs } from '../config/config';

const ListCategory = () => {

    const [categories, setCategories] = useState([])

    const GetCategories = async () => {
        await axios.get('categories')
        .then(res => {            
            if (res.status === 200) {
                setCategories(res.data.categories)
            }
        }).catch(function (err) {
            console.log(err)
        })
    }

    useEffect(() => {
        GetCategories()
    }, [])

  return (
    <div className='flex items-center justify-between gap-5 overflow-scroll scrollbar-none'>
        {
             categories?.map((category, index) => {
                return (
                    <div className='flex flex-col items-center cursor-pointer'>
                        <div className='w-20 h-20 rounded-full overflow-hidden bg-white'>
                            <img src={`${Configs.BACKEND_URL}/images/${category.image}`} alt='' width={80} height={80} className='w-full h-full object-scale-down' />
                        </div>
                        <p className='text-sm font-semibold'>{category.name}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ListCategory