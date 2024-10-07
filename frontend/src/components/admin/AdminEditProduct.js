import React, { useEffect, useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../../helpers/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import DisplayImage from '../DisplayImage';
import { Configs } from '../../config/config';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminEditProduct = ( props ) => {

    const { handleClose, values, getProducts} = props
    const { userToken } = JSON.parse(localStorage.getItem('user_data'))  

    const [data, setData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        selling: '',
    })
    const [productImages, setProductImages] = useState([])
    const [fullScreenImage, setFullScreenImage] = useState('')
    const [fullScreenWindowOpen, setFullScreenWindowOpen] = useState(false)

    useEffect(() => {
        setData(values);            
    }, [])


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleUploadProductImage = (e) => {
        const files = e.target.files
        const finalFiles = [...productImages]

        for (let file of files) {
            finalFiles.push(file)
        }
        setProductImages(finalFiles)  
    }

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...productImages]
        newProductImage.splice(index, 1)
        setProductImages(newProductImage)
    }

    const handleDeleteProductImage2 = (index) => {
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData(prevFormData => ({
            ...prevFormData,
            productImage: newProductImage
        }));
    }

    const resetData = {
        productName: '',
        brandName: '',
        category: '',
        productImage: '',
        description: '',
        price: '',
        selling: '',
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "multipart/form-data"
                }
            }

            const formData = new FormData();
            formData.append("productName", data.productName)
            formData.append("brandName", data.brandName)
            formData.append("category", data.category)
            formData.append("description", data.description)
            formData.append("productImage", data.productImage)
            formData.append("price", data.price)
            formData.append("selling", data.selling)
            for (let image of productImages) {
                formData.append("image", image)
            }

            await axios.put(`/product/${values._id}`, formData, config)
                .then(res => {
                    if (res.status === 200) {
                        handleClose()
                        setData(resetData)
                        setProductImages([])
                        getProducts()
                    }

                }).catch(err => {
                    console.log(err) 
                    toast.error(err.response.data.message)
                })
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='w-full  h-screen  fixed top-0 left-0 z-50 bg-black bg-opacity-30 flex justify-center items-center'>
            <div className='bg-white w-full max-w-2xl p-4 h-screen max-h-[90%]  overflow-hidden relative'>
                <div className=' flex justify-between items-center pb-3'>
                    <h2 className='text-lg font-bold'>Edit Product</h2>
                    <div className='w-fit ml-auto hover:text-red-600 cursor-pointer' onClick={handleClose}>
                        <CgClose />
                    </div>
                </div>
                <div className='border max-h-[95%] pb-4 overflow-y-scroll '>
                    <form className='h-full grid p-4 gap-2 '>

                        <label htmlFor='productName' className='mt-3 text-sm'>Product Name : </label>
                        <input
                            type='text'
                            id='productName'
                            name='productName'
                            placeholder='Enter Product Name'
                            value={data.productName}
                            className='p-2 bg-slate-100 border rounded'
                            onChange={handleOnChange}
                        />

                        <label htmlFor='brandName' className='mt-3 text-sm'>Brand Name : </label>
                        <input
                            type='text'
                            id='brandName'
                            name='brandName'
                            placeholder='Enter brand Name'
                            value={data.brandName}
                            className='p-2 bg-slate-100 border rounded'
                            onChange={handleOnChange}
                        />

                        <label htmlFor='category' className='mt-3 text-sm'>Category : </label>
                        <select
                            value={data.category}
                            className='p-2 bg-slate-100 border rounded'
                            id='category'
                            name='category'
                            onChange={handleOnChange}
                        >
                            <option value="">Select Category</option>
                            {
                                productCategory.map((el, index) => {
                                    return (
                                        <option value={el.value} key={el.value + index}>{el.label}</option>
                                    )
                                })
                            }
                        </select>


                        <label htmlFor='productImage' className='mt-3 text-sm'>Category : </label>
                        <label htmlFor='uploadImageInput'>
                            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                    <span className='text-4xl'><FaCloudUploadAlt /></span>
                                    <p className='text-sm'>Upload Product Image</p>
                                    <input type='file' multiple id='uploadImageInput' className='hidden' onChange={handleUploadProductImage} />
                                </div>
                            </div>
                        </label>
              {/* {backendan kelgan images} */}
                        <div className='flex gap-2'>
                            {
                                data.productImage.map((el, index) => {
                                    return (
                                        <div className='relative group  w-20 h-20  overflow-hidden'>
                                            <img
                                                src={`${Configs.BACKEND_URL}/images/${el}`} width={80} height={100}
                                                className='bg-slate-100 border-2 w-full h-full  object-scale-down'
                                                onClick={() => {
                                                    setFullScreenImage(el)
                                                    setFullScreenWindowOpen(true)
                                                }}
                                            />
                                            <div className='absolute bottom-0 right-0 p-1 bg-red-500  cursor-pointer hidden group-hover:block' onClick={() => handleDeleteProductImage2(index)} >
                                                <MdDelete className='text-white' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                {/* {frontenddan kelgan images} */}
                            {                                   
                                productImages.map((el, index) => {
                                    return (
                                        <div className='relative group  w-20 h-20  overflow-hidden'>
                                            <img
                                                src={URL.createObjectURL(el)} width={80} height={80}
                                                className='bg-slate-100 border-2 w-full h-full  object-scale-down'
                                                onClick={() => {
                                                    setFullScreenImage(el)
                                                    setFullScreenWindowOpen(true)
                                                }}
                                            />
                                            <div className='absolute bottom-0 right-0 p-1 bg-red-500  cursor-pointer hidden group-hover:block' onClick={() => handleDeleteProductImage(index)} >
                                                <MdDelete className='text-white' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>


                        <div className='flex w-full gap-4'>
                            <div className=' w-full'>
                                <label htmlFor='price' className='mt-3 text-sm'>Price : </label>
                                <input
                                    type='number'
                                    id='price'
                                    name='price'
                                    placeholder='Enter price'
                                    value={data.price}
                                    className='p-2 bg-slate-100 w-full border rounded'
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className=' w-full'>
                                <label htmlFor='price' className='mt-3 text-sm'>Selling : </label>
                                <input
                                    type='number'
                                    id='selling'
                                    name='selling'
                                    placeholder='Enter selling'
                                    value={data.selling}
                                    className='p-2 bg-slate-100 w-full border rounded'
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <label htmlFor='description' className='mt-3 text-sm'>Description : </label>
                        <textarea
                            rows={4}
                            type='text'
                            id='description'
                            name='description'
                            placeholder='Enter description'
                            value={data.description}
                            className='p-2 bg-slate-100 w-full border rounded resize-none'
                            onChange={handleOnChange}
                        />

                        <button
                            className='w-full bg-red-500 p-2 rounded text-white hover:bg-red-400 mt-2'
                            onClick={handleSubmit}
                        >Upload Product</button>
                    </form>
                </div>                
                {fullScreenWindowOpen &&
                    <div className='absolute top-0 left-0 w-full h-full'>
                        <DisplayImage onClose={() => setFullScreenWindowOpen(false)} img={fullScreenImage} />
                    </div>
                }
            </div>
        </div>
    )
}

export default AdminEditProduct