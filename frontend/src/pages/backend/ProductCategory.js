import React, { useEffect, useState } from 'react'
import { Breadcrumbs, Pagination, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CreateProductCategory from '../../components/admin/CreateProductCategory'
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { Configs } from '../../config/config';
import moment from 'moment'
import EditProductCategory from '../../components/admin/EditProductCategory'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'

const ProductCategory = () => {

  const navigate = useNavigate()

  const { userToken } = JSON.parse(localStorage.getItem('user_data'))
  const { logout } = useAuth()

  const [categorys, setCategorys] = useState([])
  const [createCategory, setCreateCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [category, setCategory] = useState(null);



  const getCategorys = async () => {
    await axios.get('product-category', {
      headers: {
        "Authorization": `Bearer ${userToken}`
      }
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        setCategorys(res.data.categories)
        console.log(categorys)
      }
    }).catch(error => {
      console.log(error.message)
      if(error.status === 403){
        navigate('login')
        logout()
      }
    })
  }

  useEffect(() => {
    getCategorys()
  },[])

  const handleOpen = (event) => {
    setCreateCategory(true);
  };

  const handleClose = (event) => {
    setCreateCategory(false);
    setEditCategory(false)
  };

  const handleEditOpen = (value) => {
    setCategory(value)
    setEditCategory(true)
  } 
  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`product-category/${id}`, {
          headers: {
            "Authorization": `Bearer ${userToken}`
          }
        }).then(res => {
          if(res.status === 200){
            getCategorys()
          }
        }).catch( error => {
          console.log(error);      
        })       
      }
    });

    
  }

  return (
    <div className='m-2 p-4 '>
      <div className='flex justify-between sticky top-16 z-2 items-end mb-4 shadow-md bg-white p-4'>
        <div>
          <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '14px' }} >
            <Link underline="hover" color="inherit" href="/admin">
              Admin
            </Link>
            <Typography sx={{ color: 'text.primary', fontSize: '14px' }}>Product category</Typography>
          </Breadcrumbs>
          <div className='flex items-end mt-2'>
            <h1 className='text-2xl font-bold mr-3'>Products</h1>
            <p className='text-sm text-stone-500'><span className='font-semibold mr-1'>5</span> found product categorys</p>
          </div>
        </div>

        <button
          className='text-sm text-red-500 font-semibold px-3 py-1 rounded-full border-red-500 border-2 hover:bg-red-500 hover:text-white'
          onClick={handleOpen}
        >Add Category
        </button>
      </div>

      <div className='bg-white sticky top-0  flex max-h-[calc(100vh-300px)] overflow-y-scroll'>
        
        <table className='w-full border'>
          <thead className='border text-right sticky top-0 bg-white py-1 text-sm'>
              <th className='p-3 text-center w-40'>Image</th>
              <th className='p-3 text-left'>Name</th>
              <th className='p-3 border text-center w-40'>Product count</th>
              <th className='p-3 border w-40'>Create Date</th>
              <th className='p-3 border w-40'>Status</th>
              <th className='p-3 border w-40 text-center'>Action</th>
          </thead>
          <tbody className=''>
            {categorys && 
              categorys.map((category) => {
                return(
                  <tr className='text-right hover:bg-stone-100'>
                    <td className='px-2 flex justify-center'>
                      <img src={`${Configs.BACKEND_URL}/images/${category.image}`} alt={category.name} className='w-16 h-16 object-scale-down'/>
                    </td>
                    <td className='px-3 text-left'>{category.name}</td>
                    <td className='px-3 text-center'>{10}</td>
                    <td className='px-3'>{moment(category.createdAt).format('ll')}</td>
                    <td className='px-3 '>
                      {category.status === 'active' ?
                          <span className='px-4 rounded-full text-sm bg-green-200 text-green-600'>{category.status}</span> :
                          <span className='px-4 rounded-full text-sm bg-orange-300 text-orange-600'>{category.status}</span> 
                      }
                    </td>
                    <td className='px-3  '>
                      <div className='flex items-start justify-center gap-1'>
                        <div className='p-2 bg-orange-400 text-white hover:bg-orange-500 cursor-pointer' onClick={() => handleEditOpen(category)} >
                          <MdModeEditOutline  />
                        </div>
                        <div className='p-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer'  onClick={() => handleDelete(category._id)}>
                          <MdDelete />
                        </div>
                      </div>
                      
                    </td>
                  </tr>
                )
              })
            }
              
          </tbody>
        </table>

      </div>
      <div className='flex justify-end p-5 bg-white'>
        <Pagination count={categorys.length} size="small" />
      </div>
      {editCategory && 
        <EditProductCategory handleClose={handleClose} getCategorys={getCategorys} data={category}/>
      }

      {createCategory &&
        <CreateProductCategory handleClose={handleClose} getCategorys={getCategorys} />
      }


    </div >
  )
}

export default ProductCategory