import React, { useEffect, useState } from 'react'
import ProductUpload from '../../components/admin/ProductUpload'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import AdminProductCard from '../../components/admin/AdminProductCard'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Products = () => {

  const navigate = useNavigate()
  const { userToken } = JSON.parse(localStorage.getItem('user_data'))
  const { logout } = useAuth()

  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState([])
  

  const getProducts = async () => {
    try {
      await axios.get('products',  {
        headers: {
          "Authorization": `Bearer ${userToken}`,
        }
      })
        .then(res => {
          if (res.status === 200) {
            setData(res.data.products)
            console.log('Get product page', res.data.products)
          }
        }).catch(error => {
          if(error.status === 403){
            navigate('login')
            logout()
          }
        })
    } catch (error) {
      console.log('Get product error', error);      
    }
  }

  useEffect(() => {
    getProducts()
  }, [])


  const handleOpen = () => {
    setOpenModal(true)
  };

  const handleClose = () => {
    setOpenModal(false)
  };

  const handleDelete = (id) => {
    console.log(id);
    
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
        axios.delete(`product/${id}`, {
          headers: {
            "Authorization": `Bearer ${userToken}`,
          }
        })
          .then(res => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              getProducts()
            }
          }).catch(function (error) {
            console.log(error);
            
            // if (error.status === 403) {
            //   navigate('/login')
            //   logout()
            // }
          })
      }
    });
};




  return (
    <div className='m-2 p-4 '>
      <div className='flex justify-between items-end mb-4 bg-white p-4'>
        <div className='flex items-end'>
          <h1 className='text-2xl font-bold mr-3'>Products</h1>
          <p className='text-sm text-stone-500'><span className='font-semibold mr-1'>{data.length}</span> found products</p>
        </div>
        <button
          className='text-sm text-red-500 font-semibold px-3 py-1 rounded-full border-red-500 border-2 hover:bg-red-500 hover:text-white'
          onClick={handleOpen}
        >Add Product
        </button>
      </div>
      <div className='flex gap-4 flex-wrap'>
        {data &&
          data.map(item => {
            return <AdminProductCard data={item} getProducts={getProducts} handleDelete={handleDelete}/>
          })
        }
      </div>

      <ProductUpload handleClose={handleClose} openModal={openModal}  getProducts={getProducts}/>


    </div>
  )
}

export default Products