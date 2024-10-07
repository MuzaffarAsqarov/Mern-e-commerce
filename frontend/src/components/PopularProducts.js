import axios from 'axios'
import React, { useEffect, useState } from 'react'
import HorizontalCard from './horizontalCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import VerticalCard from './verticalCard';

import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const PopularProducts = (props) => {

    const { header, categoryId, type } = props
    

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const getProducts = async () => { 
        await axios.get(`product-category/${categoryId}`)
            .then(res => {
                if (res.status === 200) {
                    setProducts(res.data.products)
                    setLoading(false)
                    
                }
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getProducts()
    }, [categoryId])

    const card = (product) => {
        switch (type) {
            case 'horizontal':
                return (<HorizontalCard product={product} loading={loading} />)
                break;
            case 'vertical':
                return (<VerticalCard product={product} loading={loading}/>)
                break;
        }
    }
    

    return (
        <>
            {products &&
                <div className='w-full my-6'>
                    <h1 className='text-2xl font-bold mb-6'>{header}</h1>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: type === 'vertical' ? 5 : 4,
                                spaceBetween: type === 'vertical' ? 50 : 40,
                            },
                            1024: {
                                slidesPerView: type === 'vertical' ? 6 : 5,
                                spaceBetween: type === 'vertical' ? 60 : 50,
                            },
                        }}
                        navigation={true}
                        modules={[Autoplay,  Navigation]}
                        className="mySwiper"
                    >
                        {products &&
                            products.map(product => {
                                return (
                                    <SwiperSlide>
                                        {card(product)}
                                    </SwiperSlide>)
                            })
                        }
                    </Swiper>
                </div>
            }
        </>
    )
}

export default PopularProducts