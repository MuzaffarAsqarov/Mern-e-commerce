import React, { useState } from 'react'
import { FormControlLabel, FormGroup, } from '@mui/material'
import Switch from '@mui/material/Switch';
import { FaUserPlus } from 'react-icons/fa6'
import { IoMdClose } from "react-icons/io";
import axios from 'axios';



const CreateProductCategory = (props) => {

  const { userToken } = JSON.parse(localStorage.getItem('user_data'))
  const { handleClose, getCategorys } = props

  const [category, setCategory] = useState({
    name: '',
    status: true,
  })
  const [image, setImage] = useState(null)


  const handleChange = (event) => {    
    const { name, value } = event.target
    setCategory(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
    
  };

  const handleChangeSwitch = (event) => {
    setCategory(prevFormData => ({
      ...prevFormData,
      status: event.target.checked
    }));
  };


  const handleUploadProductImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formdata = new FormData()
    formdata.append('name', category.name)
    formdata.append('status', category.status)
    formdata.append('image', image)

    await axios.post(`product-category`, formdata, {
      headers: {
          "Authorization": `Bearer ${userToken}`,
      }
    }).then(res => {
      console.log(res.data);
      if(res.status === 200){
        handleClose()
        getCategorys()
      }      
    }).catch(err => {
      console.log(err.message || err)
    })
  }

  return (
    <div className='w-full h-full fixed flex justify-center items-center top-0 left-0 bg-black bg-opacity-20'>
      <div className='w-full max-w-96 flex flex-col items-center bg-white p-4'>
        <div className='w-full flex justify-between items-center mb-6'>
          <h1 className='text-lg font-bold'>Create Category</h1>
          <div className='p-1 hover:bg-red-200 cursor-pointer' onClick={handleClose}>
            <IoMdClose />
          </div>
        </div>

        <form className='w-full  flex flex-col items-center p-4'>

          <div className='flex flex-col  w-[100px] h-[100px] border rounded-full overflow-hidden gap-1'>
            <label className='relative w-full h-full cursor-pointer'>
              {
                image ?
                  <img src={URL.createObjectURL(image)} alt='category name' className='w-full h-full  object-scale-down' /> :
                  <div className='w-full h-full flex items-center justify-center'>
                    <FaUserPlus className='text-4xl hover:text-red-600' />
                  </div>
              }
              <input type='file' name='name' onChange={handleUploadProductImage} className='absolute top-0 left-0 hidden' />
            </label>
          </div>

          <div className='flex flex-col w-full gap-1  mt-4'>
            <label htmlFor='name' className='text-sm text-stone-600'>Category Name</label>
            <input type='text' name='name' value={category.name} onChange={handleChange} className='outline-none border-b p-2 w-full' />
          </div>

          <div className='flex flex-col w-full gap-1  mt-4'>
            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Status"
                name='status'
                checked={category.status}
                onChange={handleChangeSwitch}
              />
            </FormGroup>
          </div>
          <button onClick={handleSubmit} className='w-full p-2 bg-red-500 rounded font-semibold mt-5 text-white hover:bg-red-600'>Create</button>
        </form>
      </div>

    </div>
  )
}

export default CreateProductCategory