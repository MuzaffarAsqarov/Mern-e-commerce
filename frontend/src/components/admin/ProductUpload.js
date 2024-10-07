import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdClose, MdDelete } from "react-icons/md";
import productCategory from '../../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from '../DisplayImage';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { maxHeight } from '@mui/system';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 800,
    maxHeight: '90%',
    overflow: 'hidden',
    overflowY: "scroll",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

const ProductUpload = (props) => {

    const { openModal, handleClose, getProducts } = props
    const { token } = useAuth()
    const { userToken } = JSON.parse(localStorage.getItem('user_data'))

    const [data, setData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: '',
        description: '',
        price: '',
        selling: '',
    })
    const [productImages, setProductImages] = useState([])
    const [categories, setCategories] = useState([])
    const [fullScreenImage, setFullScreenImage] = useState('')
    const [fullScreenWindowOpen, setFullScreenWindowOpen] = useState(false)

    const resetData = {
        productName: '',
        brandName: '',
        category: '',
        productImage: '',
        description: '',
        price: '',
        selling: '',
    }
    const getCategores = async () => {
        await axios.get(`product-category`, {
            headers: {
                "Authorization": `Bearer ${userToken}`,
              }
        }).then(res => {
            if(res.status === 200){
                setCategories(res.data.categories)
            }
        }).catch(error => {
            console.log(error);
            
        })
    }

    useEffect(() => {
        getCategores()
    },[])

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleUploadProductImage = (e) => {
        const files = e.target.files
        console.log(files);
        const finalFiles = [...productImages]

        for (let file of files) {
            finalFiles.push(file)
        }

        setProductImages(finalFiles)
    }

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...productImages]
        console.log(newProductImage)
        newProductImage.splice(index, 1)
        setProductImages(newProductImage)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }

            const formData = new FormData();
            formData.append("productName", data.productName)
            formData.append("brandName", data.brandName)
            formData.append("category", data.category)
            formData.append("description", data.description)
            formData.append("price", data.price)
            formData.append("selling", data.selling)
            for (let image of productImages) {
                formData.append("image", image)
            }

            await axios.post('product', formData, config)
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
        <Modal
            open={openModal}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <MdClose className='text-black absolute right-3 top-2 cursor-pointer box-content p-1 hover:bg-stone-300' onClick={handleClose} />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new Product
                </Typography>

                <div>
                    <form className='grid p-4 gap-2 overflow-y-scroll'>

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
                                categories.map((el, index) => {
                                    return (
                                        <option value={el._id} key={el._id}>{el.name}</option>
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
                        <div className='flex gap-2'>
                            {productImages.length > 0 &&
                                productImages.map((el, index) => {
                                    return (
                                        <div className='relative group  w-20 h-20  overflow-hidden'>
                                            <img
                                                src={URL.createObjectURL(el)} width={80} height={100}
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

            </Box>
        </Modal>
    )
}

export default ProductUpload