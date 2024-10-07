import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import bannerImage1 from '../../assest/banner/img1.webp'
import bannerImage2 from '../../assest/banner/img2.webp'
import bannerImage3 from '../../assest/banner/img3.jpg'
import bannerImage4 from '../../assest/banner/img4.jpg'
import bannerImage5 from '../../assest/banner/img5.webp'

const Banner = () => {
    const bannerImages = [
        bannerImage1,
        bannerImage2,
        bannerImage3,
        bannerImage4,
        bannerImage5,
    ]

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="swiper w-full min-h-80 h-80 mt-5"
            >
                {
                    bannerImages.map(item => {
                        return (
                            <SwiperSlide className='overflow-hidden min-h-80 h-80'>
                                <img src={item} alt='banner' className='w-full min-h-80 h-80 object-cover'/>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div>
    )
}

export default Banner