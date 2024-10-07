import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Configs } from '../../config/config';
import axios from 'axios';
import ReactStars from 'react-stars'
import displayINRCurrency from '../../helpers/displayCurrency';
import PopularProducts from '../../components/PopularProducts';
import ProductsPoCategory from '../../components/productsPoCategory';
import addToCard from '../../helpers/addToCard';

const ProductDetails = () => {

    const { id } = useParams()

    const [product, setProduct] = useState([])
    const [activeImage, setActiveImage] = useState('')
    const [zoomImage, setZoomImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
        x : 0,
        y : 0
      })

    const getProduct = async () => {
        setLoading(true)
        await axios.get(`product/${id}`)
        .then(res => {          
            if(res.status === 200){
                setProduct(res.data.product)
                setActiveImage(res.data.product.productImage[0])
                setLoading(false)
                window.scrollTo(0, 0)
            }
        }).catch(err => {
            console.log(err);            
        })
    }

    useEffect(() => {
        getProduct()
    }, [id])

    const handleMouseEnterProduct = (path) => {
        setActiveImage(path)
    }

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCoordinate({
            x, 
            y
        })
    }, [zoomImageCoordinate])

    const handleLeaveImageZoom = ()=>{
        setZoomImage(false)
    }
    

  return (
    <div className=' container py-5 pb-24 mx-auto '>
        <h1 className='text-2xl font-semibold mb-4'>Product Details...</h1>
        <div className='flex gap-8'>
            <div className='flex gap-4'>
                <div className='flex flex-col gap-1 w-24  max-h-[400px] overflow-hidden overflow-y-scroll scrollbar-none'>
                    {product.productImage &&
                        product.productImage.map(image => {
                            return (
                                <div className='w-24 h-24 overflow-auto border bg-slate-200 cursor-pointer' >
                                    <img src={`${Configs.BACKEND_URL}/images/${image}`} 
                                        className='w-full h-full object-scale-down' 
                                        onMouseEnter={() => handleMouseEnterProduct(image)}
                                        onClick={() => handleMouseEnterProduct(image)}
                                    />
                                </div>
                            )
                        })                        
                    }
                </div>

                <div className='w-[400px] h-[400px] z-30 border relative bg-slate-200'>
                    <img src={`${Configs.BACKEND_URL}/images/${activeImage}`} 
                        className='w-full h-full object-scale-down cursor-pointer mix-blend-multiply'
                        onMouseMove={handleZoomImage} 
                        onMouseLeave={handleLeaveImageZoom}
                    />
                    {zoomImage &&
                        <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[500px] bg-slate-200 -right-[510px] top-0'>
                            <div 
                                className='w-full h-full min-h-[500px] min-w-[500px] mix-blend-multiply scale-150'
                                style={{
                                    background: `url(${Configs.BACKEND_URL}/images/${activeImage})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                }}
                            >
                            </div>
                        </div>                                                
                    }
                </div>
            </div>
            <div>
                <div className='w-full py-6'>
                    <p className='inline-block text-sm font-semibold px-2 capitalize rounded-full bg-red-300 text-orange-700'>{product.brandName}</p>
                    <h1 className='text-3xl font-semibold'>{product.productName}</h1>
                    <h1 className='text-sm capitalize text-stone-500 font-semibold'>{product?.category?.name}</h1>
                    <ReactStars
                        count={5}
                        size={24}
                        value={3.5}
                        edit={false}
                        color2={'#ffd700'} />
                        <p>
                            <span className='text-2xl font-bold text-red-500 mr-5' >{displayINRCurrency(product.price)}</span>
                            <span className='text-2xl font-bold text-stone-500 line-through'>{displayINRCurrency(product.selling)}</span>
                        </p>
                        <div className='flex gap-5 my-4'>
                            <button className='px-12 py-1 border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500'>Bay</button>
                            <button className='px-5 py-1 border-2 bg-red-500 border-red-500 text-white hover:text-red-500 hover:bg-white' onClick={(e) => addToCard(e, product?._id)}>Add to card</button>
                        </div>
                        <p className='font-semibold mb-1'> Description:</p>
                        <p className='line-clamp-4 text-sm leading-6'> {product.description}</p>
                </div>
            </div>
        </div> 

        <PopularProducts categoryId={`${product?.category?._id}`} header={"Recomended Top Product!"} type={'vertical'}/>
        <ProductsPoCategory  categoryId={`${product?.category?._id}`}/> 

    </div>
  )
}

export default ProductDetails