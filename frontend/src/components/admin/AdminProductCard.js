import React, { useState } from 'react'
import { Configs } from '../../config/config';
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../../helpers/displayCurrency';
import { CiTrash } from "react-icons/ci";

const AdminProductCard = (props) => {

    const { data, getProducts, handleDelete } = props 

    const [editProduct, setEditProduct] = useState(false)

    const handleOpen = () => {
        setEditProduct(true)
    };

    const handleClose = () => {
        setEditProduct(false)
    };
    
    

    return (
        <div className='bg-white p-4  border overflow-hidden relative  rounded-none hover:shadow-md'>
            {/* <div className='absolute top-1 right-1 cursor-pointer p-2 hover:bg-stone-50' >
                <IoMdClose />
            </div> */}
            <div className='w-36 flex justify-center'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={`${Configs.BACKEND_URL}/images/${data?.productImage[0]}`} width={120} height={120} className='mx-auto object-scale-down h-full' />
                </div>
            </div>
            <p className='w-36 mb-2 text-sm  line-clamp-2'>{data.productName}</p>
            <p className='mb-8'>
                { displayINRCurrency(data.price)}
            </p>
            <div className='w-fit ml-auto flex gap-2 absolute bottom-2 right-2'>
                <div className='p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={handleOpen}  >
                    <MdEdit />
                </div>
                <div className=' cursor-pointer p-2 rounded-full bg-red-100 hover:bg-red-500 hover:text-white'onClick={() => handleDelete(data._id)} >
                    <CiTrash  />
                </div>
            </div>
            

            {editProduct &&
                <AdminEditProduct handleClose={handleClose} values={data} getProducts={getProducts} />
            }
        </div>
    )
}

export default AdminProductCard