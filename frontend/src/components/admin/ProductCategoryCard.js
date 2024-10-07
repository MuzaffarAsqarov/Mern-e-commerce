import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'

const ProductCategoryCard = (props) => {

    const { data } = props
    
  return (
    <div className='bg-white p-4  border rounded-none '>
            <div className='w-35 flex justify-center'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={`${Configs.BACKEND_URL}/images/${data?.productImage[0]}`} width={120} height={120} className='mx-auto object-scale-down h-full' />
                </div>
            </div>
            <h1 cclassName='text-ellipsis line-clamp-2'>categoru name</h1>
            
            <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={handleOpen}  >
                <MdEdit />
            </div>
            

            {/* {editProduct &&
                <AdminEditProduct handleClose={handleClose} values={data} getProducts={getProducts} />
            } */}
        </div>
  )
}

export default ProductCategoryCard